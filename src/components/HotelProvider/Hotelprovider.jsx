import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const HotelContext = createContext();
function HotelProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadingcurrentHotel, setisLoadingcurrentHotel] = useState(false);
  const [currentHotel, setcurrentHotel] = useState({});
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isloading, Data } = useFetch(
    "https://hotel-db-9c4a.vercel.app/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
 async function getHotel(id) {
    setisLoadingcurrentHotel(true);
    try {
      const { data } =await axios.get(
        `https://hotel-db-9c4a.vercel.app/hotels/${id}`
      );
      setcurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setisLoadingcurrentHotel(false);
    }
  }
  return (
    <HotelContext.Provider value={{ isloading, Data, getHotel,currentHotel,isLoadingcurrentHotel }}>
      {children}
    </HotelContext.Provider>
  );
}
export default HotelProvider;
export function useHotels() {
  return useContext(HotelContext);
}
