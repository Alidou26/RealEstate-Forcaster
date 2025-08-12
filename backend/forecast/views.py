import os
import joblib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

model = None  # Ne pas charger au démarrage

class PredictView(APIView):
    def load_model(self):
        global model
        if model is None:
            model_path = os.path.join(os.path.dirname(__file__), 'real_estate_model.pkl')
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")
            model = joblib.load(model_path)
        return model

    def post(self, request):
        try:
            data = request.data

            # Liste des champs obligatoires et de leurs types attendus
            required_fields = {
                'code_postal': int,
                'surface_reelle_bati': float,
                'nombre_pieces_principales': int,
                'longitude': float,
                'latitude': float,
                'Monument': int,
                'Parc': int,
                'Indice_Commercial': int,
                'Indice_Educatif': int,
                'Indice_Sante': int,
                'Indice_Loisirs': int,
                'year': int,
                'month': int
            }

            # Vérification de la présence des champs requis et de leur type
            missing = [field for field in required_fields if field not in data]
            if missing:
                return Response(
                    {"error": f"Missing required fields: {', '.join(missing)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Conversion explicite des champs à leurs types appropriés
            for field, expected_type in required_fields.items():
                try:
                    data[field] = expected_type(data[field])
                except ValueError:
                    return Response(
                        {"error": f"Field '{field}' could not be converted to {expected_type.__name__}."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Gestion des champs booléens pour le type_local
            type_local_appartement = int(bool(data.get('type_local_Appartement', 0)))
            type_local_industrial = int(bool(data.get('type_local_Local industriel. commercial ou assimilé', 0)))
            type_local_maison = int(bool(data.get('type_local_Maison', 0)))

            # Construction des features dans l'ordre correct
            features = [
                data['code_postal'],
                data['surface_reelle_bati'],
                data['nombre_pieces_principales'],
                data['longitude'],
                data['latitude'],
                data['Monument'],
                data['Parc'],
                data['Indice_Commercial'],
                data['Indice_Educatif'],
                data['Indice_Sante'],
                data['Indice_Loisirs'],
                data['year'],
                data['month'],
                type_local_appartement,
                type_local_industrial,
                type_local_maison
            ]

            # Chargement du modèle et prédiction
            model = self.load_model()
            prediction = model.predict([features])

            return Response({'prediction': float(prediction[0])})

        except FileNotFoundError as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': f"Internal error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
