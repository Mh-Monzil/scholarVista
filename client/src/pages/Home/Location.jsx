
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Location = () => {
    const position = [23.911522, 90.388962];
  return (
    <div className='h-[500px] max-w-7xl mx-auto my-20 mb-40'>
        <SectionTitle title={"Where We Located?"} />
      <MapContainer center={position} zoom={12} scrollWheelZoom={false} className='w-full h-full z-[-10]' >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Location;
