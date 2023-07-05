import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Mc.module.css";
import wifipoints from "./data/wifi-points.json";
import L from "leaflet";

function Mapcomp() {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
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
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Mapcomp;
