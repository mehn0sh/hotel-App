import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiSearch,
  HiMinus,
  HiPlus,
  HiLogout,
} from "react-icons/hi";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useAuth } from "../AuthProvider/AuthProvider";
const Header = () => {
  const [searchParams, setSeacrhParams] = useSearchParams();
  const [destination, setdestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setopenOptions] = useState(false);
  const [openDate, setopenDate] = useState(false);
  const navigate = useNavigate();
  const [options, setoptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      destination,
      options: JSON.stringify(options),
      date: JSON.stringify(date),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  const [date, setdate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleOption = (name, operation) => {
    setoptions((prev) => {
      return {
        ...prev,
        [name]: operation == "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div>
      <div className="header">
        <div className="headerSearch">
          <div className="headerSearchItem">
            <Link to={"/bookmarks"}>
              <button className=" btn navbarBtn">Bookmarks</button>
            </Link>
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <MdLocationOn className="headerIcon locationIcon" />
            <input
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              type="text"
              placeholder="Where to go ?"
              className="headerSearchInput"
              id="destination"
              name="destination"
            />
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <HiCalendar className="headerIcon dateIcon" />
            <div
              className="dateDropDown"
              onClick={() => setopenDate(!openDate)}
            >
              {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyy"
              )}`}
            </div>
            <div>
              {openDate && (
                <DateRange
                  ranges={date}
                  onChange={(item) => setdate([item.selection])}
                  minDate={new Date()}
                  className="date"
                  moveRangeOnFirstSelection={true}
                />
              )}
            </div>
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem smallSize">
            <div
              id="optionDropDown"
              onClick={() => setopenOptions(!openOptions)}
            >
              {options.adult} adult • {options.children}children •{" "}
              {options.room} room
            </div>
            <GuestOptionList
              options={options}
              openOptions={openOptions}
              handleOption={handleOption}
              setopenOptions={setopenOptions}
            />
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <button className="headerSearchBtn" onClick={handleSearch}>
              <HiSearch className="headerIcon searchIcon" />
            </button>
          </div>
          <div className="headerSearchItem">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

function GuestOptionList({
  openOptions,
  options,
  handleOption,
  setopenOptions,
}) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setopenOptions(false));
  return (
    <div className={`guestOptions ${openOptions && "active"}`} ref={optionRef}>
      <OptionItem
        type={"adult"}
        options={options}
        minLimit={1}
        handleOption={handleOption}
      />
      <OptionItem
        type={"children"}
        options={options}
        minLimit={0}
        handleOption={handleOption}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={1}
        handleOption={handleOption}
      />
    </div>
  );
}
function OptionItem({ type, options, minLimit, handleOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleOption(type, "dec")}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { isAuthenticated, user, logOut } = useAuth();
  const navigate = useNavigate();
  const logOutHandler = () => {
    logOut()
    navigate("/");
  };
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>Hi {user.name} !</span>{" "}
          <button>
            <HiLogout onClick={() => logOutHandler()} />
          </button>{" "}
        </div>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </div>
  );
}
