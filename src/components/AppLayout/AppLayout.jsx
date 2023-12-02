import React from "react";
import { Outlet } from "react-router-dom";
import { useHotels } from "../HotelProvider/Hotelprovider";
import Map from "../Map/Map";

const AppLayout = () => {
  const { isloading, Data: hotels } = useHotels();

  return (
    <div className="appLayout">
      <div className="sidebar"><Outlet/></div>
      <Map BookmarkHotel={hotels}/>
    </div>
  );
};

export default AppLayout;
