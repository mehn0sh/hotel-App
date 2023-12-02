import React, { useEffect, useState } from "react";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUlLocation from "../../hooks/useUrlLocation";
const Map = ({ BookmarkHotel }) => {
  const [mapCenter, setmapCenter] = useState([52, 4.3]);
  const [lat, lng] = useUlLocation();
  const { loadingGeo, errorGeo, positionGeo, getGeoPosition } =
    useGeoLocation();
  useEffect(() => {
    if (lat && lng) setmapCenter([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (positionGeo.lat && positionGeo.lng) {
      setmapCenter([positionGeo.lat, positionGeo.lng]);
    }
  }, [positionGeo]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getGeoPosition}>
          {loadingGeo ? "loading..." : "use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        <DetectClick />
        {BookmarkHotel.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      ,
    </div>
  );
};

export default Map;
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
