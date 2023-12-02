import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../BookmarkProvider/BookmarkProvider";

export const SingleBookMark = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmark, isloading, currentBookmark } =
    useBookmarks();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  const handleBack=()=>{
    navigate(-1)
  }
  if (isloading) return <div>loading</div>;
  return (
    <div>
      <button onClick={handleBack} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <p>{currentBookmark.country}</p>
    </div>
  );
};
