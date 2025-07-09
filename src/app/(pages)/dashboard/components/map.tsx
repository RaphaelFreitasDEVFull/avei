"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrigir ícones
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const center: [number, number] = [-23.55, -46.63];
const properties: { id: number; name: string; position: [number, number] }[] = [
  { id: 1, name: "Casa A", position: [-23.55052, -46.633308] },
  { id: 2, name: "Apartamento B", position: [-23.559616, -46.658668] },
];

export default function MapPin() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <MapContainer
      // @ts-expect-error center expects LatLngExpression but accepts tuple
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-expect-error external attribution type mismatch
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map(({ id, name, position }) => (
        <Marker key={id} position={position}>
          <Popup>{name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
