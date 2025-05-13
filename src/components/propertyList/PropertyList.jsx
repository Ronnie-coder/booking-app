import "./propertyList.css"

const PropertyList = () => {
  return (
    <div className="pList">
        <div className="pListItem">
            <img 
                src="/hotels.jpg" 
                alt="Hotels" 
                className="pListImg"
             />
            <div className="pListTitles">
                <h1>Hotels</h1>
                <h2>233 hotels</h2>
            </div>
        </div>
        
        <div className="pListItem">
            <img 
                src="/ap.jpeg" 
                alt="Apartments" 
                className="pListImg"
             />
            <div className="pListTitles">
                <h1>Apartments</h1>
                <h2>156 apartments</h2>
            </div>
        </div>
        
        <div className="pListItem">
            <img 
                src="re.webp" 
                alt="Resorts" 
                className="pListImg"
             />
            <div className="pListTitles">
                <h1>Resorts</h1>
                <h2>89 resorts</h2>
            </div>
        </div>
        
        <div className="pListItem">
            <img 
                src="/vll.jpeg" 
                alt="Villas" 
                className="pListImg"
             />
            <div className="pListTitles">
                <h1>Villas</h1>
                <h2>114 villas</h2>
            </div>
        </div>
        
        <div className="pListItem">
            <img 
                src="/cb.jpg" 
                alt="Cabins" 
                className="pListImg"
             />
            <div className="pListTitles">
                <h1>Cabins</h1>
                <h2>78 cabins</h2>
            </div>
        </div>
    </div>
  )
}

export default PropertyList