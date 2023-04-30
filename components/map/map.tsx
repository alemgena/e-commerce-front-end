import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface IMapProps {
  center: [number, number];
  location: string;
  region:string
}

const Icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconSize: [25, 40],
});

export const Map: React.FC<IMapProps> = ({ center,location,region }) => {
  return (
    <MapContainer center={center} zoom={14} style={{ height: '420px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={center} icon={Icon}>
        <Popup>{location},{region}</Popup>
      </Marker>
    </MapContainer>
  );
};
