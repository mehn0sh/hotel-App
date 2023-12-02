import React from "react";
import useFetch from "../hooks/useFetch";

const LocationList = () => {
  const { isloading, Data } = useFetch(
    "https://hotel-db-9c4a.vercel.app/hotels"
  );
  if (isloading) return <div>loading..</div>;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {Data.map((item) => (
          <div className="locationItem" key={item.id}>
            <img src={item.picture_url.url} alt={item.name} />
            <div className="LocationItemDesc">
              <p className="Location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                $&nbsp;{item.price}&nbsp;
                <span>night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
