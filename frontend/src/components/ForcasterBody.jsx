import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/forcaster.css';

// Composant pour gérer les clics sur la carte
const ClickableMap = ({ setCoordinates, currentCoordinates, setPostalCode }) => {
    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            const coords = { 
                latitude: lat.toFixed(6), 
                longitude: lng.toFixed(6) 
            };
            setCoordinates(coords);
            
            // Récupération du code postal via l'API Nominatim
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
                );
                const data = await response.json();
                const postalCode = data.address?.postcode;
                if (postalCode) {
                    setPostalCode(postalCode);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du code postal:", error);
            }
        },
    });

    return currentCoordinates.latitude && currentCoordinates.longitude ? (
        <Marker position={[currentCoordinates.latitude, currentCoordinates.longitude]}>
            <Popup>
                Zone sélectionnée<br />
                {`Lat: ${currentCoordinates.latitude}, Lng: ${currentCoordinates.longitude}`}
            </Popup>
        </Marker>
    ) : null;
};

const RealEstateForm = () => {
    const [formData, setFormData] = useState({
        moisAnnee: '',
        code_postal: '',
        type_local: 'Maison',
        surface_reelle_bati: '',
        nombre_pieces_principales: '',
        longitude: '',
        latitude: '',
        Monument: 0,
        Parc: 0,
        indice_commercial: '',
        indice_educatif: '',
        indice_sante: '',
        indice_loisirs: ''
    });

    const [currentCoordinates, setCurrentCoordinates] = useState({ latitude: '', longitude: '' });
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateCoordinates = (coords, postalCode = null) => {
        setCurrentCoordinates(coords);
        setFormData(prev => ({
            ...prev,
            longitude: coords.longitude,
            latitude: coords.latitude,
            ...(postalCode && { code_postal: postalCode })
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setPrediction(null);

        const [annee, mois] = formData.moisAnnee.split('-');

        const dataToSend = {
            code_postal: parseInt(formData.code_postal),
            surface_reelle_bati: parseFloat(formData.surface_reelle_bati),
            nombre_pieces_principales: parseInt(formData.nombre_pieces_principales),
            longitude: parseFloat(formData.longitude),
            latitude: parseFloat(formData.latitude),
            Monument: parseInt(formData.Monument),
            Parc: parseInt(formData.Parc),
            Indice_Commercial: parseInt(formData.indice_commercial),
            Indice_Educatif: parseInt(formData.indice_educatif),
            Indice_Sante: parseInt(formData.indice_sante),
            Indice_Loisirs: parseInt(formData.indice_loisirs),
            year: parseInt(annee),
            month: parseInt(mois),
            'type_local_Appartement': formData.type_local === 'Appartement' ? 1 : 0,
            'type_local_Local industriel. commercial ou assimilé': formData.type_local === 'Industriel' ? 1 : 0,
            'type_local_Maison': formData.type_local === 'Maison' ? 1 : 0
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/predict/', dataToSend);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Prediction error:', error);
            if (error.response) {
                setError(error.response.data.error || 'Prediction failed');
            } else if (error.request) {
                setError('No response from server');
            } else {
                setError('Request setup error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forcaster-container">
            <div className="features-container">
                <h2 className="forcaster-title">Real Estate Price Prediction</h2>

                {error && (
                    <div className="error-message">
                        Error: {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="feature">
                        <label className="feature-name">Select Month & Year</label>
                        <input
                            className="feature-case"
                            type="month"
                            name="moisAnnee"
                            required
                            value={formData.moisAnnee}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Postal Code</label>
                        <input
                            className='feature-case'
                            type="number"
                            name="code_postal"
                            required
                            value={formData.code_postal}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Property Type</label>
                        <select
                            className='feature-case'
                            name="type_local"
                            required
                            value={formData.type_local}
                            onChange={handleChange}
                        >
                            <option className='option' value="Maison">Maison</option>
                            <option className='option' value="Industriel">Industriel/Commercial/Assimilé</option>
                            <option className='option' value="Appartement">Appartement</option> {/* Added Appartement */}
                        </select>
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Surface Area (m²)</label>
                        <input
                            className='feature-case'
                            type="number"
                            step="0.1"
                            name="surface_reelle_bati"
                            min="0"
                            required
                            value={formData.surface_reelle_bati}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Number of Main Rooms</label>
                        <input
                            className='feature-case'
                            type="number"
                            name="nombre_pieces_principales"
                            min="0"
                            required
                            value={formData.nombre_pieces_principales}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Longitude</label>
                        <input
                            className='feature-case'
                            type="number"
                            step="0.000001"
                            name="longitude"
                            required
                            value={formData.longitude}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Latitude</label>
                        <input
                            className='feature-case'
                            type="number"
                            step="0.000001"
                            name="latitude"
                            required
                            value={formData.latitude}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature checkbox-group'>
                        <div className='checkbox-item'>
                            <label className='feature-name'>Monument Index</label>
                            <input
                                className='feature-case'
                                type="number"
                                name="Monument"
                                min="0"
                                required
                                value={formData.Monument}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='checkbox-item'>
                            <label className='feature-name'>Park Index</label>
                            <input
                                className='feature-case'
                                type="number"
                                name="Parc"
                                min="0"
                                required
                                value={formData.Parc}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Commercial Index</label>
                        <input
                            className='feature-case'
                            type="number"
                            name="indice_commercial"
                            min="0"
                            required
                            value={formData.indice_commercial}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Educational Index</label>
                        <input
                            className='feature-case'
                            type="number"
                            name="indice_educatif"
                            min="0"
                            required
                            value={formData.indice_educatif}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Health Index</label>
                        <input
                            className='feature-case'
                            type="number"
                            name="indice_sante"
                            min="0"
                            required
                            value={formData.indice_sante}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='feature'>
                        <label className='feature-name'>Leisure Index</label>
                        <input
                            className='feature-case'
                            type="number"
                            name="indice_loisirs"
                            min="0"
                            required
                            value={formData.indice_loisirs}
                            onChange={handleChange}
                        />
                    </div>


                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <button className="predict-btn" type="submit" disabled={isLoading}>
                            {isLoading ? 'Predicting...' : 'Predict Price'}
                        </button>
                        <div className="predict-case">
                            <p id="predicted-price">
                                {prediction ? `${prediction.toLocaleString()}€` : 'Awaiting prediction...'}
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            <div className="maps-container">
                <h3 className="map-title">Select a Location in Paris</h3>
                <MapContainer
                    center={[48.8566, 2.3522]}
                    zoom={12}
                    maxBounds={[[48.815573, 2.224199], [48.902145, 2.469920]]}
                    maxBoundsViscosity={1.0}
                    style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                >
                    <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

                    <ClickableMap
                        setCoordinates={updateCoordinates}
                        currentCoordinates={currentCoordinates}
                        setPostalCode={(code) => setFormData(prev => ({ ...prev, code_postal: code }))}
                    />
                </MapContainer>
            </div>
        </div>
    );
};

export default RealEstateForm;