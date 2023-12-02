import { useState } from "react";
import { toast } from "react-hot-toast";
export default function useGeoLocation() {
  const [loadingGeo, setloadingGeo] = useState(false);
  const [errorGeo, seterrorGeo] = useState(null);
  const [positionGeo, setpositionGeo] = useState({});
  function getGeoPosition() {
    if (!navigator.geolocation) {
      seterrorGeo("your browser dose not access");
      toast.error("your browser dose not access");
    }

    setloadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setpositionGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setloadingGeo(false);
        console.log(positionGeo);
        console.log(pos);
      },
      (err) => {
        seterrorGeo(err.message);
        toast.error(err.message);
        setloadingGeo(false);
      }
    );
    console.log(positionGeo);
  }
  return { loadingGeo, errorGeo, positionGeo, getGeoPosition };
}
