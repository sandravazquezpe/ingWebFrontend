import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Spinner from 'react-bootstrap/Spinner';
import '../../styles/default.css';
import 'leaflet/dist/leaflet.css'; // Asegura cargar los estilos de Leaflet
import L from "leaflet";

const Map = ({ lat, lon }) => {

    const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41], // Tamaño del ícono
        iconAnchor: [12, 41], // Punto de anclaje del ícono
        popupAnchor: [1, -34], // Posición del popup
        shadowSize: [41, 41], // Tamaño de la sombra
      });

    return (
        <>
            {lat && lon ?

                (
                    <div className='container-mapa'>
                        <MapContainer

                            center={[lat, lon]}
                            zoom={13}
                            style={{ height: '200px', width: '200px' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[lat, lon]} icon={customIcon} />
                        </MapContainer >


                    </div>
                )
                :
                (
                    <Spinner />
                )
            }
        </>
    );
};

export default Map;