import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUlLocation from "../../hooks/useUrlLocation";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-hot-toast";
import { useBookmarks } from "../BookmarkProvider/BookmarkProvider";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
const AddNewBookMark = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUlLocation();
  const [cityName, setcityName] = useState("");
  const [countryName, setcountryName] = useState("");
  const [countryCode, setcountryCode] = useState();
  const [isLoadingGeoCoding, setisLoadingGeoCoding] = useState(false);
  const [geoCodingError, setgeoCodingError] = useState("");
  const { createBookMark, setaddedBookmark, addedBookmark ,isloading} = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setisLoadingGeoCoding(true);
      setgeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        setcityName(data.city || data.locality || "");
        setcountryName(data.countryName);
        setcountryCode(data.countryCode);
        if (!data.countryCode) throw new Error("this location is not a city");
      } catch (error) {
        setgeoCodingError(error.message);
        toast.error(error.message);
      } finally {
        setisLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!countryName || !cityName) return;
    const newBookmark = {
      cityName,
      countryCode,
      country: countryName,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + countryCode,
    };
    await createBookMark(newBookmark);
    // navigate("/bookmarks");
  };
  if (isLoadingGeoCoding) return <p>loading..</p>;
  if (geoCodingError) return <p>{geoCodingError}</p>;
  if (addedBookmark) {
    return (
      <div>
        successfully added to Book marks
        <button
          className="btn--back btn"
          onClick={(e) => {
            e.preventDefault();
            navigate("/bookmarks");
            setaddedBookmark(false);
            window.location.reload();
          }}
        >
          &larr; Back to Bookmarks
        </button>
      </div>
    );
  }
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form action="" className="form" >
        <div className="formControl">
          <label htmlFor="cityName">city name</label>
          <input type="text" name="cityName" id="cityName" value={cityName} />
        </div>
        <div className="formControl">
          <label htmlFor="country">country name</label>
          <input type="text" name="country" id="country" value={countryName} />
          <ReactCountryFlag svg countryCode={countryCode} className="flag" />
        </div>
        <div className="buttons">
          <button
            className="btn--back btn"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button type="submit" className="btn btn--primary" onClick={submitHandler} >
            &larr; {`${isloading ? 'loading' : 'add'}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookMark;
