import "./hotel.css"
import { useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faLocationDot, 
  faCar, 
  faWineGlass, 
  faMedal, 
  faStar, 
  faUtensils, 
  faWifi, 
  faSwimmingPool, 
  faSpa, 
  faMountain, 
  faCalendarAlt, 
  faCheck, 
  faHeart,
  faShareAlt,
  faExpand,
  faAngleLeft,
  faAngleRight,
  faTimes,
  faThumbsUp,
  faShuttleVan,
  faCoffee,
  faConciergeBell
} from "@fortawesome/free-solid-svg-icons"

const Hotel = () => {
  const [saved, setSaved] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [animateSave, setAnimateSave] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Photos array - using your provided image paths, assuming they're hotel images
  const photos = [
    {
      src: "/m4.jpg",
      alt: "Hotel Exterior"
    },
    {
      src: "/m4cs.jpg",
      alt: "Luxury Suite"
    },
    {
      src: "/m8.jpg",
      alt: "Swimming Pool"
    },
    {
      src: "/x5m.jpg",
      alt: "Restaurant"
    },
    {
      src: "/s3.jpg",
      alt: "Spa"
    },
    {
      src: "/tt.jpg",
      alt: "Ocean View"
    },
  ];

  // Reviews for the property
  const reviews = [
    { rating: 9.6, comment: "Exceptional views and service!", user: "Janet", date: "July 2023", helpful: 24 },
    { rating: 9.8, comment: "Best stay in Cape Town!", user: "Themba", date: "June 2023", helpful: 18 },
  ];

  // Featured amenities
  const amenities = [
    { icon: faWifi, name: "Free High-Speed WiFi" },
    { icon: faSwimmingPool, name: "Infinity Pool" },
    { icon: faSpa, name: "Luxury Spa" },
    { icon: faUtensils, name: "5-Star Restaurant" },
    { icon: faMountain, name: "Mountain Views" },
    { icon: faCar, name: "Free Parking" }
  ];

  // Handle save button click with animation
  const handleSave = () => {
    setSaved(!saved);
    setAnimateSave(true);
    setTimeout(() => setAnimateSave(false), 1000);
  };

  // Navigate through images
  const handleImgNav = (direction) => {
    if (direction === "prev") {
      setSelectedImg(prev => (prev === 0 ? photos.length - 1 : prev - 1));
    } else {
      setSelectedImg(prev => (prev === photos.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="hotelPage">
      <Navbar />
      <Header type="list"/>
      
      {/* Fullscreen Image Viewer */}
      {showFullscreen && (
        <div className="fullscreenViewer">
          <button className="closeBtn" onClick={() => setShowFullscreen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button className="navBtn leftBtn" onClick={() => handleImgNav("prev")}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <div className="mainImage">
            <img src={photos[selectedImg].src} alt={photos[selectedImg].alt} />
            <div className="imageCaption">{photos[selectedImg].alt}</div>
          </div>
          <button className="navBtn rightBtn" onClick={() => handleImgNav("next")}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <div className="thumbnailStrip">
            {photos.map((photo, i) => (
              <div 
                className={`thumbnail ${selectedImg === i ? 'activeThumbnail' : ''}`} 
                key={i}
                onClick={() => setSelectedImg(i)}
              >
                <img src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </div>
          <div className="imageCounter">{selectedImg + 1} / {photos.length}</div>
        </div>
      )}

      {/* Share Options Popup */}
      {showShareOptions && (
        <div className="shareOptions">
          <div className="shareContainer">
            <button className="closeShareBtn" onClick={() => setShowShareOptions(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Share this amazing find</h3>
            <div className="shareBtns">
              <button className="shareBtn whatsapp">WhatsApp</button>
              <button className="shareBtn facebook">Facebook</button>
              <button className="shareBtn twitter">Twitter</button>
              <button className="shareBtn email">Email</button>
            </div>
            <div className="shareLink">
              <input type="text" value="https://yourbookingapp.com/hotel/grand-safari-lodge" readOnly />
              <button>Copy</button>
            </div>
          </div>
        </div>
      )}

      <div className="hotelContainer">
        <div className="hotelWrapper">
          <div className="hotelTitleWrapper">
            <h1 className="hotelTitle">Grand Safari Lodge</h1>
            <div className="hotelRating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon icon={faStar} className="starIcon" key={star} />
              ))}
              <span>5.0</span>
            </div>
            <div className="titleActions">
              <button 
                className={`saveButton ${saved ? 'saved' : ''} ${animateSave ? 'pulse' : ''}`} 
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faHeart} className="saveIcon" />
                <span>{saved ? 'Saved' : 'Save'}</span>
                {animateSave && <span className="saveAnimation">❤️</span>}
              </button>
              <button className="shareButton" onClick={() => setShowShareOptions(true)}>
                <FontAwesomeIcon icon={faShareAlt} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="hotelBadges">
            <span className="propertyBadge">
              <FontAwesomeIcon icon={faMedal} /> Superhost
            </span>
            <span className="propertyBadge">
              <FontAwesomeIcon icon={faCheck} /> Verified Property
            </span>
            <span className="propertyBadge dealBadge">
              <span className="pulseDot"></span> Special Offer
            </span>
          </div>

          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Cape Town, South Africa</span>
            <a href="#" className="viewOnMap">View on map</a>
          </div>
          <span className="hotelDistance">
            <FontAwesomeIcon icon={faLocationDot} /> Prime location - 500m from V&A Waterfront
          </span>
          <span className="hotelPriceHighlight">
            <FontAwesomeIcon icon={faWineGlass} /> Book a stay over R2,000 at this property and get a complimentary wine tour
          </span>

          {/* Image Gallery with Interactive Elements */}
          <div className="imageGalleryContainer">
            <div className="primaryImage">
              <img 
                src={photos[0].src} 
                alt={photos[0].alt} 
                onClick={() => {
                  setSelectedImg(0);
                  setShowFullscreen(true);
                }}
              />
              <button className="expandBtn" onClick={() => {
                setSelectedImg(0);
                setShowFullscreen(true);
              }}>
                <FontAwesomeIcon icon={faExpand} />
                <span>View all photos</span>
              </button>
            </div>
            <div className="secondaryImages">
              {photos.slice(1, 5).map((photo, i) => (
                <div 
                  className="secondaryImgWrapper" 
                  key={i}
                  onClick={() => {
                    setSelectedImg(i+1);
                    setShowFullscreen(true);
                  }}
                >
                  <img src={photo.src} alt={photo.alt} className="secondaryImg"/>
                </div>
              ))}
            </div>
          </div>

          <div className="amenitiesContainer">
            <h3>
              <FontAwesomeIcon icon={faCheck} /> Top Amenities
            </h3>
            <div className="amenitiesList">
              {amenities.map((item, i) => (
                <div className="amenityItem" key={i}>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Experience Luxury in the Heart of Cape Town</h1>
              <p className="hotelDesc">
                Located in the vibrant center of Cape Town, Grand Safari Lodge offers an authentic South African experience with modern luxury. Our rooms feature stunning views of Table Mountain and the Atlantic Ocean. Each suite is decorated with local artwork and crafts, celebrating the rich cultural heritage of South Africa.
                
                The property is just minutes away from the famous V&A Waterfront, offering easy access to premier shopping, dining, and entertainment options. Our in-house restaurant serves traditional South African cuisine with a contemporary twist, featuring local wines from the nearby Cape Winelands.
                
                Guests can enjoy our rooftop pool with panoramic city views, fully-equipped fitness center, and rejuvenating spa treatments inspired by African wellness traditions. Our concierge can arrange bespoke experiences including wildlife safaris, wine tours, and cultural excursions to truly immerse yourself in the South African experience.
              </p>
              
              <div className="highlightServices">
                <div className="serviceItem">
                  <FontAwesomeIcon icon={faShuttleVan} className="serviceIcon" />
                  <div className="serviceText">
                    <h4>Airport Shuttle</h4>
                    <p>Complimentary shuttle service from Cape Town International Airport</p>
                  </div>
                </div>
                <div className="serviceItem">
                  <FontAwesomeIcon icon={faCoffee} className="serviceIcon" />
                  <div className="serviceText">
                    <h4>Breakfast Included</h4>
                    <p>Gourmet breakfast with local South African specialties</p>
                  </div>
                </div>
                <div className="serviceItem">
                  <FontAwesomeIcon icon={faConciergeBell} className="serviceIcon" />
                  <div className="serviceText">
                    <h4>24/7 Concierge</h4>
                    <p>Personalized assistance for all your needs during your stay</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night Cape Town adventure!</h1>
              <span>
                <FontAwesomeIcon icon={faLocationDot} /> Located in the cultural heart of Cape Town
              </span>
              <div className="reviewScoreContainer">
                <div className="reviewScore">9.8</div>
                <div className="reviewDetails">
                  <span className="reviewExcellent">Exceptional</span>
                  <span className="reviewCount">184 reviews</span>
                </div>
              </div>
              
              <div className="recentReviews">
                {reviews.map((review, i) => (
                  <div className="reviewItem" key={i}>
                    <div className="reviewHeader">
                      <span className="reviewRating">{review.rating}</span>
                      <span className="reviewDate">{review.date}</span>
                    </div>
                    <span className="reviewComment">"{review.comment}"</span>
                    <div className="reviewFooter">
                      <span className="reviewUser">- {review.user}</span>
                      <button className="helpfulBtn">
                        <FontAwesomeIcon icon={faThumbsUp} /> {review.helpful}
                      </button>
                    </div>
                  </div>
                ))}
                <button className="allReviewsBtn">Read all 184 reviews</button>
              </div>
              
              <div className="bookingBox">
                <div className="bookingPrice">
                  <h2>
                    <b>R18,900</b> <span className="priceUnit">(9 nights)</span>
                  </h2>
                  <div className="priceBreakdown">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>Aug 15 - Aug 24</span>
                    <button className="changeDatesBtn">Change</button>
                  </div>
                </div>
                
                <div className="roomSelection">
                  <label>Select room type:</label>
                  <select className="roomDropdown">
                    <option>Luxury Suite - Mountain View</option>
                    <option>Deluxe Suite - Ocean View</option>
                    <option>Executive Suite - Panoramic View</option>
                    <option>Family Suite - Garden View</option>
                  </select>
                </div>
                
                <button className="bookNowButton">Reserve or Book Now!</button>
                <div className="paymentNote">
                  <span>No payment required today</span>
                  <span>Free cancellation before Aug 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Hotel