import "./featured.css"

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="/cpt.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Cape Town</h1>
          <h2>123 properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img src="/pe.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Pretoria</h1>
          <h2>123 properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img src="/limp.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Limpopo</h1>
          <h2>123 properties</h2>
        </div>
      </div>
    </div>
  )
}

export default Featured