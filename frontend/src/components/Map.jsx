import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const ClickableMap = ({ setCoordinates, currentCoordinates }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ latitude: lat.toFixed(6), longitude: lng.toFixed(6) });
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

const Map = () => {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default Map;