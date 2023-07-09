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
import L from "leaflet";
import React, { useState, useEffect } from "react";

function Mapcomp() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [wifipoints, setWifipoints] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/poi/poi/")
      .then((response) => response.json())
      .then((data) => setWifipoints(data))
      .catch((error) => {
        console.error("Error fetching wifipoints:", error);
      });
  }, []);

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
    if (selectedMarker) {
      const { latitude, longitude } = selectedMarker;
      const circleData = {
        latitude,
        longitude,
        radius: 10000, // Assuming the radius is fixed at 10000 meters
      };

      fetch("http://127.0.0.1:8000/api/poi/poi/circle/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(circleData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Circle saved successfully:", data);
          // Perform any necessary actions after saving the circle
        })
        .catch((error) => {
          console.error("Error saving circle:", error);
          // Handle the error case
        });
    }
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
          <Tooltip>
            Click to save the area within 10km <br /> or right click to delete
            point!
          </Tooltip>
        </Marker>
      );
    }

    return null;
  };

  return (
    <>
      <div className={styles.lc}>
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
              <Popup>
                <div>
                  <h3>{points.title}</h3>
                  <p>{points.description}</p>
                </div>
              </Popup>
              <Tooltip>
                Click to save the area within 10km <br /> or right click to
                delete point!
              </Tooltip>
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
    </>
  );
}

export default Mapcomp;
