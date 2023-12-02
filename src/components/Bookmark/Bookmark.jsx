import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useBookmarks } from "../BookmarkProvider/BookmarkProvider";
import Map from "../Map/Map";

const BookmarkLayot = () => {
 const  {bookmarks}= useBookmarks()
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet/>
      </div>
      <Map  BookmarkHotel={bookmarks}/>
    </div>
  );
};

export default BookmarkLayot;