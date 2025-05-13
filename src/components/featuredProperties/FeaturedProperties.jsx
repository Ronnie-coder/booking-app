import "./featuredProperties.css";

const featuredProperties = () => {
  return (
    <div className="featuredProperties">
      {/* First featured property */}
      <div className="fp">
        <div className="fpItem">
        <img src="/ld.jpg" alt="" className="fpImg" />
        <span className="fpName">Cape Town Lodge</span>
        <span className="fpCity">Cape Town</span>
        <span className="fpPrice">Starting from $120</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Excellent</span>
          </div>
        </div>
      </div>
      
      {/* Second featured property */}
      <div className="fp">
        <div className="fpItem">
        <img src="/db.jpg" alt="" className="fpImg" />
        <span className="fpName">Durban Beach Hotel</span>
        <span className="fpCity">Durban</span>
        <span className="fpPrice">Starting from $130</span>
        <div className="fpRating">
          <button>8.7</button>
          <span>Very Good</span>
        </div>
        </div>
      </div>
      
      {/* Third featured property */}
      <div className="fp">
        <div className="fpItem">
        <img src="/sd.jpg" alt="" className="fpImg" />
        <span className="fpName">Sandton Skyline Suite</span>
        <span className="fpCity">Johannesburg</span>
        <span className="fpPrice">Starting from $110</span>
        <div className="fpRating">
          <button>9.0</button>
          <span>Fantastic</span>
        </div>
        </div>
      </div>

      {/* Fourth featured property */}
      <div className="fp">
        <div className="fpItem">
        <img src="/pte.jpg" alt="" className="fpImg" />
        <span className="fpName">Pretoria Palace Inn</span>
        <span className="fpCity">Pretoria</span>
        <span className="fpPrice">Starting from $140</span>
        <div className="fpRating">
          <button>9.1</button>
          <span>Superb</span>
        </div>
        </div>
      </div>

      {/* Fifth featured property */}
      <div className="fp">
        <div className="fpItem">
        <img src="/kg.jpeg" alt="" className="fpImg" />
        <span className="fpName">Kruger Safari Lodge</span>
        <span className="fpCity">Kruger National Park</span>
        <span className="fpPrice">Starting from $180</span>
        <div className="fpRating">
          <button>9.5</button>
          <span>Exceptional</span>
        </div>
        </div>
      </div>

    </div>
  );
};

export default featuredProperties;