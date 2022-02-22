import React, { useState, useEffect } from 'react'
import ReactMapGL, {Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import mapImg from './map_icon.png';
import 'mapbox-gl/dist/mapbox-gl.css'

function Map() {
    const [locations, setLocations] = useState([]);
    const [showPopup, setShowPopup] = useState({});
    const [addLocation, setAddLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 40,
        longitude: -90,
        zoom: 4,
    });
 
    const getLocations = async () => {
      try {
        const allLocations = await axios.get("http://localhost:3001/locations/");
        console.log(allLocations.data);
        setLocations(allLocations.data);
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
    getLocations();
  }, []);

  const showMarkerPopup = (event) => {
    console.log(event.lngLat);
    const [longitude, latitude] = event.lngLat;
    setAddLocation({
      longitude,
      latitude,
    });
  };
  return (
      <div>
          
      <ReactMapGL
        {...viewport}        
        mapboxAccessToken="pk.eyJ1IjoiZ2luZXJpayIsImEiOiJja3locTgxYTQxbTdpMnZxcG42dm5ud21uIn0.o0QKYkB9wSvIKI1riHBUjg"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onMove={evt => setViewport(evt.viewState)}
        mapStyle= "mapbox://styles/ginerik/ckyhsbswo2rhe14o821xwdfme"
	      style={{width: "100vw", height: "100vh"}}
        onDblClick={showMarkerPopup}
        transitionDuration="100"
      >
        {locations.map((p) => (
            <React.Fragment key={p._id}>
                <Marker latitude={p.latitude} longitude={p.longitude}>
                <div onClick={() =>
                setShowPopup({
                    //showPopup
                    [p._id]:true,

                })
            }
            >
                <img
                  className="map-pin"
                  style={{
                    width: `${5 * viewport.zoom}px`,
                    height: `${5 * viewport.zoom}px`,
                  }}
                  src= {mapImg}

                  alt="Map Pin Logo"
                />
              </div>
            </Marker>
         
          {showPopup[p._id] ? (
              <Popup
                latitude={p.latitude}
                longitude={p.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <ReactStars
                    count={5}
                    value={p.rating}
                    size={29}
                    activeColor="#ffd700"
                  />
                  
                  <h3>{p.place}</h3>
                  <p>{p.username}</p>
                  <p>{p.description}</p>
                  
                  <p>Rating: {p.rating}</p>
                 
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        ))}
      
      </ReactMapGL>
</div>
  );
};
export default Map;