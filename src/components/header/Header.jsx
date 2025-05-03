import "./header.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, 
  faCalendar, 
  faCar, 
  faPerson, 
  faPlane, 
  faTaxi, 
  faPlus, 
  faMinus, 
  faLocationDot, 
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const dateRef = useRef(null);
  const optionsRef = useRef(null);

  // Function to close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRef.current && !dateRef.current.contains(event.target) && openDate) {
        setOpenDate(false);
      }

      if (optionsRef.current && !optionsRef.current.contains(event.target) && openOptions) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDate, openOptions]);

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleDateClick = () => {
    setOpenDate(!openDate);
    setOpenOptions(false);
  };

  const handleOptionsClick = () => {
    setOpenOptions(!openOptions);
    setOpenDate(false);
  };

  const handleSearch = () => {
    // Placeholder for search functionality
    alert(`Searching for ${destination} from ${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} with ${options.adult} adults, ${options.children} children in ${options.room} room(s).`);
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        <h1 className="headerTitle">A lifetime of discounts? It's CodeRon.</h1>
        <p className="headerDesc">
          Get rewarded for your travels - unlock instant savings of 10% or more 
          with free CodeRon account
        </p>
        <button className="headerBtn">Sign in / Register</button>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faLocationDot} className="headerIcon"/>
            <input 
              type="text" 
              placeholder="Where are you going?"
              className="headerSearchInput"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem" ref={dateRef}>
            <FontAwesomeIcon icon={faCalendar} className="headerIcon"/>
            <span 
              onClick={handleDateClick} 
              className="headerSearchText"
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
            </span>
            {openDate && (
              <div className="dateRangePicker">
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="dateRange"
                />
              </div>
            )}
          </div>
          <div className="headerSearchItem" ref={optionsRef}>
            <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
            <span 
              onClick={handleOptionsClick} 
              className="headerSearchText"
            >
              {`${options.adult} adult · ${options.children} children · ${options.room} room`}
            </span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button 
                      disabled={options.adult <= 1}
                      className="optionCounterButton" 
                      onClick={() => handleOption("adult", "d")}
                    >
                      <FontAwesomeIcon icon={faMinus} className="optionIcon" />
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button 
                      className="optionCounterButton" 
                      onClick={() => handleOption("adult", "i")}
                    >
                      <FontAwesomeIcon icon={faPlus} className="optionIcon" />
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button 
                      disabled={options.children <= 0}
                      className="optionCounterButton" 
                      onClick={() => handleOption("children", "d")}
                    >
                      <FontAwesomeIcon icon={faMinus} className="optionIcon" />
                    </button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button 
                      className="optionCounterButton" 
                      onClick={() => handleOption("children", "i")}
                    >
                      <FontAwesomeIcon icon={faPlus} className="optionIcon" />
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button 
                      disabled={options.room <= 1}
                      className="optionCounterButton" 
                      onClick={() => handleOption("room", "d")}
                    >
                      <FontAwesomeIcon icon={faMinus} className="optionIcon" />
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button 
                      className="optionCounterButton" 
                      onClick={() => handleOption("room", "i")}
                    >
                      <FontAwesomeIcon icon={faPlus} className="optionIcon" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn searchButton" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;