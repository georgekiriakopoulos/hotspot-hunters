import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Mc.module.css";
import wifipoints from "./data/wifi-points.json";
import L from "leaflet";
import React, { useState } from "react";

function Mapcomp() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const closeCircleClick = () => {
    setSelectedMarker(null);
    setNewMarker(null);
  };

  const handleSaveButtonClick = () => {
    if (newMarker) {
      setSelectedMarker(newMarker);
    }
    // Perform save action with selectedMarker information
    console.log("Saving marker:", selectedMarker);
  };

  const AddMarkerOnClick = (e) => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (!selectedMarker) {
          // No marker is selected, create a new marker
          setNewMarker({ latitude: lat, longitude: lng });
        } else {
          // Marker is already selected, update its position
          setSelectedMarker({
            ...selectedMarker,
            latitude: lat,
            longitude: lng,
          });
        }
      },
    });

    if (newMarker) {
      return (
        <Marker
          position={[newMarker.latitude, newMarker.longitude]}
          eventHandlers={{
            click: () => handleMarkerClick(newMarker),
            dblclick: () => closeCircleClick(),
            contextmenu: () => closeCircleClick(),
          }}
        >

          <Tooltip>Click to save the area within 10km <br/> or right click to delete point!</Tooltip>
        </Marker>
      );
    }

    return null;
  };

  return (
    <div className={styles.c0}>
      <MapContainer
        className={styles.lc}
        center={[37.98381, 23.727539]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {wifipoints.map((points) => (
          <Marker
            key={points.id}
            position={[points.latitude, points.longitude]}
            eventHandlers={{
              click: () => handleMarkerClick(points),
              dblclick: () => closeCircleClick(),
              contextmenu: () => closeCircleClick(),
            }}
          >
            <Tooltip>Click to save the area within 10km  <br/> or double click to delete point!</Tooltip>
          </Marker>
        ))}

        {selectedMarker && (
          <Circle
            center={[selectedMarker.latitude, selectedMarker.longitude]}
            fillOpacity={0.5}
            radius={10000}
            eventHandlers={{ contextmenu: () => closeCircleClick() }}
          >
            <Tooltip>
              Click on the circled area to save or right click to close!
            </Tooltip>
            <Popup>
              Save the area within 10km of your chosen wifi point so that you
              get notified when new points are available!
              <br />
              <button
                className={styles.saveButton}
                onClick={handleSaveButtonClick}
              >
                Save Area of Interest
              </button>
            </Popup>
          </Circle>
        )}

        <AddMarkerOnClick />
      </MapContainer>
    </div>
  );
}

export default Mapcomp;
