import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../BookmarkProvider/BookmarkProvider";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const BookMarksList = () => {
  const { isloading, bookmarks, currentBookmark ,deleteBookmark} = useBookmarks();
  const deleteHandler = async (e,id) => {
    e.preventDefault();
    await deleteBookmark(id)
  };
  if (isloading) return <div>loading</div>;
  if (!bookmarks.length) return <p> there is no Bookmark location</p>;
  return (
    <div>
      <h2>BookmarkList</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <div
                className={`bookmarkItem ${
                  item.id == currentBookmark?.id && "current-bookmark"
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                  <span>{item.country}</span>
                </div>
                <button className='btn'  onClick={(e)=>deleteHandler(e,item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookMarksList;
