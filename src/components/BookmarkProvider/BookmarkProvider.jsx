import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { toast } from "react-hot-toast";
const BookmarkContext = createContext();
const initialState = {
  bookmarks: [],
  currentBookmark: {},
  isloading: false,
  error: null,
};
function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isloading: true };
    }
    case "bookmarks/loaded":
      return { ...state, isloading: false, bookmarks: action.payload };
    case "bookmark/loaded":
      return {
        ...state,
        isloading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isloading: false,
        bookmarks: [...state.bookmarks, a.payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isloading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return { ...state, isloading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
const BookmarkProvider = ({ children }) => {
  // const [bookmarks, setbookmarks] = useState([]);
  // const [isloading, setisloading] = useState(false);
  // const [currentBookmark, setcurrentBookmark] = useState({});
  const [addedBookmark, setaddedBookmark] = useState(false);
  const [{ bookmarks, currentBookmark, isloading }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(
          `https://hotel-db-d46f.vercel.app/bookmarks`
        );
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error("error");
      }
      dispatch({
        type: "rejected",
        payload: "an Errror occurred in loading bookmarks",
      });
    }
    fetchBookmarkList();
  }, []);
  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;

    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(
        `https://hotel-db-d46f.vercel.app/bookmarks/${id}`
      );
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Errror occurred in loading bookmarks",
      });
    }
  }
  async function createBookMark(newBookmark) {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(
        "https://hotel-db-d46f.vercel.app/bookmarks",
        {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": " application/json",
          },
          body: JSON.stringify(newBookmark),
        }
      );
      setaddedBookmark(true);
      const result = await response.json();
      console.log("Success:", result);
      dispatch({ type: "bookmark/created", payload: response });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }
  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(
        `https://hotel-db-d46f.vercel.app/bookmarks/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application.json",
            "Content-Type": " application/json",
          },
        }
      );
      dispatch({ type: "bookmark/deleted", payload: id });
      toast.success("item successfully deleted");
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        isloading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createBookMark,
        addedBookmark,
        setaddedBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
export function useBookmarks() {
  return useContext(BookmarkContext);
}
