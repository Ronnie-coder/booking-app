import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  const location = useLocation();
  const { destination, date, options } = location.state || {};
  
  // Search parameters state
  const [searchParams, setSearchParams] = useState({
    destination: destination || "",
    dates: date || [{
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }],
    options: options || { adult: 1, children: 0, room: 1 },
    minPrice: 0,
    maxPrice: 1000
  });
  
  // Toggle states
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Refs for handling clicks outside
  const dateRef = useRef();
  const optionsRef = useRef();
  
  // Handle clicks outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle option changes (for adults, children, rooms)
  const handleOptionChange = (name, operation) => {
    setSearchParams(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [name]: operation === "i" 
          ? prev.options[name] + 1 
          : Math.max(prev.options[name] - 1, name === "adult" || name === "room" ? 1 : 0)
      }
    }));
  };
  
  // Handle price changes
  const handlePriceChange = (name, operation) => {
    const step = name === "minPrice" ? 50 : 100;
    setSearchParams(prev => ({
      ...prev,
      [name]: operation === "i" 
        ? prev[name] + step 
        : Math.max(prev[name] - step, 0)
    }));
  };
  
  // Check if price range is valid
  const isPriceValid = () => {
    return searchParams.minPrice <= searchParams.maxPrice;
  };
  
  // Handle search button click
  const handleSearch = () => {
    setLoading(true);
    
    // Placeholder for API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  // Sample data for search items - in a real app, this would come from an API
  const sampleHotels = Array(9).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Hotel Name ${index + 1}`,
    distance: `${(Math.random() * 5).toFixed(1)} km from center`,
    tag: index % 3 === 0 ? "Free airport taxi" : "Best seller",
    type: index % 2 === 0 ? "Entire studio" : "Hotel room",
    description: "Studio Apartment with Air conditioning",
    free_cancel: index % 2 === 0,
    price: 100 + (index * 20),
    rate: Math.floor(Math.random() * 5) + 5,
    rate_text: index % 2 === 0 ? "Excellent" : "Exceptional",
    image_url: `https://source.unsplash.com/random/300x200?hotel,room&sig=${index}`
  }));
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            
            <div className="lsItem">
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                name="destination"
                type="text"
                value={searchParams.destination}
                onChange={(e) => setSearchParams(prev => ({...prev, destination: e.target.value}))}
                placeholder="Where are you going?"
                className="clickableInput"
              />
            </div>
            
            <div className="lsItem" ref={dateRef}>
              <label>Check-in Date</label>
              <div 
                className="datePickerContainer clickableInput" 
                onClick={() => setOpenDate(!openDate)}
              >
                {searchParams.dates[0]?.startDate && searchParams.dates[0]?.endDate
                  ? `${format(new Date(searchParams.dates[0].startDate), "MM/dd/yyyy")} to ${format(new Date(searchParams.dates[0].endDate), "MM/dd/yyyy")}`
                  : "Select dates"
                }
              </div>
              {openDate && (
                <div className="datePickerWrapper">
                  <DateRange
                    editableDateInputs={true}
                    onChange={item => setSearchParams(prev => ({
                      ...prev,
                      dates: [item.selection]
                    }))}
                    moveRangeOnFirstSelection={false}
                    ranges={searchParams.dates}
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>
            
            <div className="lsItem">
              <label>Min price per night</label>
              <div className="optionItem">
                <span className="optionText">Minimum price</span>
                <div className="optionControls">
                  <button
                    disabled={searchParams.minPrice <= 0}
                    className="optionButton optionDecrement"
                    onClick={() => handlePriceChange("minPrice", "d")}
                    aria-label="Decrease minimum price"
                  >
                    -
                  </button>
                  <span className="optionValue">${searchParams.minPrice}</span>
                  <button
                    className="optionButton optionIncrement"
                    onClick={() => handlePriceChange("minPrice", "i")}
                    aria-label="Increase minimum price"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lsItem">
              <label>Max price per night</label>
              <div className="optionItem">
                <span className="optionText">Maximum price</span>
                <div className="optionControls">
                  <button
                    disabled={searchParams.maxPrice <= 0}
                    className="optionButton optionDecrement"
                    onClick={() => handlePriceChange("maxPrice", "d")}
                    aria-label="Decrease maximum price"
                  >
                    -
                  </button>
                  <span className="optionValue">${searchParams.maxPrice}</span>
                  <button
                    className="optionButton optionIncrement"
                    onClick={() => handlePriceChange("maxPrice", "i")}
                    aria-label="Increase maximum price"
                  >
                    +
                  </button>
                </div>
              </div>
              {!isPriceValid() && (
                <p className="errorText">Min price should be less than max price</p>
              )}
            </div>
            
            <div className="lsItem" ref={optionsRef}>
              <label>Options</label>
              <div 
                className="optionsHeader clickableInput"
                onClick={() => setOpenOptions(!openOptions)}
              >
                {`${searchParams.options.adult} adult${searchParams.options.adult !== 1 ? 's' : ''} · 
                  ${searchParams.options.children} child${searchParams.options.children !== 1 ? 'ren' : ''} · 
                  ${searchParams.options.room} room${searchParams.options.room !== 1 ? 's' : ''}`}
              </div>
              
              {openOptions && (
                <div className="optionsDropdown">
                  {[
                    { key: "adult", label: "Adults", min: 1 },
                    { key: "children", label: "Children", min: 0 },
                    { key: "room", label: "Rooms", min: 1 }
                  ].map(option => (
                    <div className="optionItem" key={option.key}>
                      <span className="optionText">{option.label}</span>
                      <div className="optionControls">
                        <button
                          disabled={searchParams.options[option.key] <= option.min}
                          className="optionButton optionDecrement"
                          onClick={() => handleOptionChange(option.key, "d")}
                          aria-label={`Decrease ${option.label}`}
                        >
                          -
                        </button>
                        <span className="optionValue">{searchParams.options[option.key]}</span>
                        <button
                          className="optionButton optionIncrement"
                          onClick={() => handleOptionChange(option.key, "i")}
                          aria-label={`Increase ${option.label}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              className="lsSearchBtn" 
              onClick={handleSearch}
              disabled={!isPriceValid()}
            >
              Search
            </button>
          </div>

          <div className="listResult">
            {loading ? (
              <div className="loadingContainer">
                <p>Searching for the best hotels...</p>
              </div>
            ) : (
              <>
                {sampleHotels.map(hotel => (
                  <SearchItem key={hotel.id} {...hotel} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;