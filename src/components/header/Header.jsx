import React, { useState } from "react";
import "./header.css";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import CarRentalIcon from "@mui/icons-material/CarRental";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";

const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev, 
        [name]: operation === "i" ? options[name] + 1 : options[name] -1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", {state: {destination, date, options }})
  }

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode": "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <HotelIcon className="headerIcon" />
            <span>Stay</span>
          </div>
          <div className="headerListItem">
            <FlightIcon className="headerIcon" />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <TravelExploreIcon className="headerIcon" />
            <span>Flight + Hotel</span>
          </div>
          <div className="headerListItem">
            <CarRentalIcon className="headerIcon" />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <HotelIcon className="headerIcon" />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <LocalTaxiIcon className="headerIcon" />
            <span>Airport Texis</span>
          </div>
        </div>

        {type !== "list" && (<>
        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels – unlock instant savings of 10% or more
          with a free Booking.com account
        </p>
        <button className="headerBtn">Sign in / Register</button>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <HotelIcon className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
              onChange={e=> setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <CalendarMonthIcon className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="headerSearchItem">
            <PermIdentityIcon className="headerIcon" />
            <span className="headerSearchText" onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} adullt - ${options.children} children - ${options.room} room`}</span>
            {openOptions && <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button className="optionCounterButton" onClick={()=> handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button className="optionCounterButton" onClick={()=> handleOption("adult", "i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button className="optionCounterButton" onClick={()=> handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button className="optionCounterButton" onClick={()=> handleOption("children", "i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button className="optionCounterButton" onClick={()=> handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button className="optionCounterButton" onClick={()=> handleOption("room", "i")}>+</button>
                </div>
              </div>
            </div> }
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>)}
      </div>
    </div>
  );
};

export default Header;
