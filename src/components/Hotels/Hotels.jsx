import React, { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../HotelProvider/Hotelprovider";

export const Hotels = () => {
const{isloading, Data,currentHotel }=useHotels()
  if (isloading) return <div>is loading..</div>;
  return (
    <div>
      <div className="searchList">
        <h2>search Results {Data.length}</h2>
        {Data.map((item) => (
          <Link
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            key={item.id}
          >
            <div className={`searchItem ${currentHotel.id==item.id ?'current-hotel':''}`}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  {item.price}$<span>night</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
