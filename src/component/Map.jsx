import propTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";

import styles from "./Map.module.css";
import btnStyles from "./Button.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useURLPosition } from "../hooks/useURLPosition";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");

  const mapLng = searchParams.get("lng");

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation;

  const [lat, lng] = useURLPosition();

  //syncing the corrent position of the map
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  //syncing the mapPosition with the Geolocation
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <button
          className={`${btnStyles.position} ${btnStyles.btn}`}
          onClick={getPosition}
        >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {/* display flag and the name of the country when map maker is clicked on */}
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// component that handle map position
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
ChangeCenter.propTypes = {
  position: propTypes.array.isRequired, // Define prop type for position as an array
  //
};

//component that gets the lat and lng of the location that is clicked
function DetectClick() {
  //useing it to navigate to form
  const navigate = useNavigate();
  //leaflet library custom hook
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lat}`),
  });
}

export default Map;
