
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import styles from "./Mc.module.css"

function Mapcomp() {
  return ( 
    <div className= {styles.c0}  > 
        

        <MapContainer className={styles.lc } center={[37.983810, 23.727539]} zoom={13} >  
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>

       

    </div>
  );
}

export default Mapcomp;
