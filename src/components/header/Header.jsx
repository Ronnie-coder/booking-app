import "./header.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, faCalendar, faCar, faPerson, faPlane, faTaxi, 
  faPlus, faMinus, faLocationDot, faSearch
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from "react-router-dom";

const Header = ({type}) => {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRef.current && !dateRef.current.contains(event.target)) setOpenDate(false);
      if (optionsRef.current && !optionsRef.current.contains(event.target)) setOpenOptions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOption = (name, operation) => {
    setOptions(prev => ({
      ...prev,
      [name]: operation === "i" ? prev[name] + 1 : Math.max(prev[name] - 1, name === "adult" || name === "room" ? 1 : 0),
    }));
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels", {
      state: { destination, date, options }
    });
  };

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active"><FontAwesomeIcon icon={faBed}/><span>Stays</span></div>
          <div className="headerListItem"><FontAwesomeIcon icon={faPlane}/><span>Flights</span></div>
          <div className="headerListItem"><FontAwesomeIcon icon={faCar}/><span>Car rentals</span></div>
          <div className="headerListItem"><FontAwesomeIcon icon={faBed}/><span>Attractions</span></div>
          <div className="headerListItem"><FontAwesomeIcon icon={faTaxi}/><span>Airport taxis</span></div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">A lifetime of discounts? It's CodeRon.</h1>
            <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free CodeRon account</p>
            <button className="headerBtn">Sign in / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocationDot} className="headerIcon"/>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem" ref={dateRef}>
                <FontAwesomeIcon icon={faCalendar} className="headerIcon"/>
                <span onClick={() => {setOpenDate(!openDate); setOpenOptions(false);}} className="headerSearchText">
                  {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
                </span>
                {openDate && (
                  <div className="dateRangePicker">
                    <DateRange
                      editableDateInputs={true}
                      onChange={item => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                    />
                  </div>
                )}
              </div>
              <div className="headerSearchItem" ref={optionsRef}>
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span onClick={() => {setOpenOptions(!openOptions); setOpenDate(false);}} className="headerSearchText">
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    {["adult", "children", "room"].map((label, i) => (
                      <div className="optionItem" key={label}>
                        <span className="optionText">
                          {label.charAt(0).toUpperCase() + label.slice(1)}
                        </span>
                        <div className="optionCounter">
                          <button
                            disabled={label === "adult" ? options[label] <= 1 : options[label] <= 0}
                            className="optionCounterButton"
                            onClick={() => handleOption(label, "d")}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="optionCounterNumber">{options[label]}</span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption(label, "i")}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn searchButton" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch}/>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;