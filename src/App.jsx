import "./App.css";
import Header from "./components/Header/Header";
import toast, { Toaster } from "react-hot-toast";
import LocationList from "./LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import { Hotels } from "./components/Hotels/Hotels";
import HotelProvider from "./components/HotelProvider/Hotelprovider";
import SingleHotel from "./components/singleHotel/SingleHotel";
import BookmarkLayot from "./components/Bookmark/Bookmark";
import BookmarkProvider from "./components/BookmarkProvider/BookmarkProvider";
import BookMarksList from "./components/BookmarkList/BookMarksList";
import { SingleBookMark } from "./components/SingleBookMark/SingleBookMark";
import AddNewBookMark from "./components/AddNewBookMark/AddNewBookMark";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Login from "./components/Login/Login";
import ProtectedRouts from "./components/ProtectedRoutes/ProtectedRouts";

function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HotelProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmarks" element={<ProtectedRouts><BookmarkLayot /></ProtectedRouts>}>
              <Route index element={<BookMarksList />} />
              <Route path="add" element={<AddNewBookMark />} />
              <Route path=":id" element={<SingleBookMark />} />
            </Route>
            <Route path="/login" element={<Login/>} />
          </Routes>
        </HotelProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default App;
