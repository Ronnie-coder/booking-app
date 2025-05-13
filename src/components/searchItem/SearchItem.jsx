import "./searchItem.css";
import { useState } from "react";

// Property data with South African accommodations
const PROPERTY_TYPES = [
  { type: "hotel", label: "Hotel" },
  { type: "guesthouse", label: "Guest House" },
  { type: "apartment", label: "Apartment" },
  { type: "villa", label: "Villa" },
  { type: "bnb", label: "Bed & Breakfast" },
  { type: "lodge", label: "Safari Lodge" }
];

// Sample names for each property type
const PROPERTY_NAMES = {
  "hotel": ["Cape Grace Hotel", "Radisson Blue", "The Westin Cape Town"],
  "guesthouse": ["Seaside Guesthouse", "Mountain View Guest House", "Garden Route Lodge"],
  "apartment": ["City Center Apartment", "Waterfront Suite", "Beach View Condo"],
  "villa": ["Luxury Cape Villa", "Clifton Beach Villa", "Constantia Wine Estate Villa"],
  "bnb": ["Homely B&B", "Family B&B", "Garden Route B&B"],
  "lodge": ["Kruger Safari Lodge", "Wildlife Retreat", "Luxury Game Lodge"]
};

// Direct mapping of property types to their specific images
const PROPERTY_IMAGE_MAP = {
  "hotel": "/ht.jpg",
  "guesthouse": "/gh.jpeg",
  "apartment": "/ap.jpeg",
  "villa": "/vll.jpeg",
  "bnb": "/bb.jpg",
  "lodge": "/ld.jpeg"
};

const SearchItem = ({
  id,
  name,
  propertyType = "hotel", // hotel, guesthouse, apartment, villa, bnb, lodge
  location = "Cape Town",
  distance = "1.5km from V&A Waterfront",
  tag = "Free airport shuttle",
  subtitle = "Deluxe Room with Sea View",
  features = "1 bathroom • 32m² • Queen bed",
  specialFeatures = ["Outdoor pool", "Restaurant on site", "Free WiFi"],
  specialTagType = "luxury", // business, family, deals, eco, luxury
  cancellable = true,
  price = 1850,
  originalPrice = 2250,
  rating = 8.7,
  ratingText = "Fabulous",
  reviewCount = 432,
  imageIndex = 0 // Use this to get different images for same property type
}) => {
  const [expanded, setExpanded] = useState(false);
  const discount = originalPrice > price ? Math.round((1 - price/originalPrice) * 100) : 0;
  
  // Get property type label
  const propertyTypeLabel = PROPERTY_TYPES.find(p => p.type === propertyType)?.label || "Hotel";
  
  // Use provided name or get a default one based on property type
  const displayName = name || PROPERTY_NAMES[propertyType]?.[imageIndex % (PROPERTY_NAMES[propertyType]?.length || 1)] || "Accommodation";
  
  // Get image directly from the mapping - this is the key fix
  const propertyImage = PROPERTY_IMAGE_MAP[propertyType] || "/ht.jpg";
  
  // Determine tag color and icon based on type
  const getTagStyles = (type) => {
    switch(type) {
      case 'business':
        return { color: '#4a6da7', icon: '💼', text: 'Business traveller favorite' };
      case 'family':
        return { color: '#f59e0b', icon: '👨‍👩‍👧‍👦', text: 'Family friendly' };
      case 'deals':
        return { color: '#10b981', icon: '🔥', text: 'Hot deal' };
      case 'eco':
        return { color: '#059669', icon: '🌱', text: 'Eco-friendly' };
      case 'luxury':
        return { color: '#8b5cf6', icon: '✨', text: 'Luxury stay' };
      default:
        return { color: '#4a6da7', icon: '💼', text: 'Business traveller favorite' };
    }
  };

  const tagStyle = getTagStyles(specialTagType);

  return (
    <div className="searchItem">
      {/* Direct image path based on property type */}
      <img 
        src={propertyImage} 
        alt={`${propertyTypeLabel} ${displayName}`} 
        className="siImg"
      />
      {discount > 0 && <div className="siDiscount">Save {discount}%</div>}
      
      <div className="siDesc">
        <div className="siTitleArea">
          <h1 className="siTitle">{displayName}</h1>
          <div className="siLocation">
            <span className="siPropertyType">{propertyTypeLabel} in </span>
            {location}
          </div>
        </div>
        
        <div className="siTopInfo">
          <span className="siDistance">{distance}</span>
          {tag && <span className="siTaxiOp">{tag}</span>}
        </div>
        
        <span className="siSubtitle">{subtitle}</span>
        <span className="siFeatures">{features}</span>

        {specialFeatures && specialFeatures.length > 0 && (
          <div className="siSpecialFeatures" style={{borderLeftColor: tagStyle.color}}>
            <span className="siSpecialTitle">
              <span className="siSpecialIcon">{tagStyle.icon}</span> 
              {tagStyle.text}
            </span>
            <div className="siSpecialTags">
              {specialFeatures.map((feature, index) => (
                <span key={index} className="siSpecialTag">
                  • {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {cancellable && (
          <>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </>
        )}
        
        <button 
          className="siShowMore" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more details"}
        </button>
        
        {expanded && (
          <div className="siExpandedDetails">
            <h4>Property highlights:</h4>
            <ul className="siHighlights">
              <li>Breakfast included</li>
              <li>Located in a safe, central area</li>
              <li>{specialTagType === 'family' ? 'Kids activities available' : 
                  specialTagType === 'business' ? 'Business center and meeting rooms' :
                  specialTagType === 'eco' ? 'Environmentally certified property' :
                  specialTagType === 'luxury' ? 'Spa and wellness center' :
                  'Great location score'}</li>
              <li>Free private parking available</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="siDetails">
        <div className="siRating">
          <div className="siRatingTexts">
            <span className="siRatingText">{ratingText}</span>
            <span className="siReviewCount">{reviewCount} reviews</span>
          </div>
          <button className="siRatingButton">{rating}</button>
        </div>
        
        <div className="siDetailTexts">
          {originalPrice > price && (
            <span className="siOriginalPrice">R{originalPrice}</span>
          )}
          <span className="siPrice">R{price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          
          <div className="siBookingOptions">
            <button className="siCheckButton">See availability</button>
            <button className="siSaveButton">Save for later</button>
          </div>
          
          <span className="siLastBooked">
            Booked {Math.floor(Math.random() * 6) + 1} times in the last 24 hours
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;