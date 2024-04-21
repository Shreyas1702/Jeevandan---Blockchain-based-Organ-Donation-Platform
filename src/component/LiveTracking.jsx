import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS file
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useLocation } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hyZXlhczE3MDIiLCJhIjoiY2w2Znc3MDVuMGF5MDNqcDhmcngzc3N3diJ9.aW22Z6A-NJQnTfD4Ml6bMQ';


const LiveTracking = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [lng, setLng] = useState(72.829636);
    const [lat, setLat] = useState(19.8158378);
    const [time , setTime] = useState("");
    const [zoom, setZoom] = useState(9);

    const location = useLocation();

useEffect(() => {

        setTimeout(async () => {
            console.log(location.state.tId)

            const tId = location.state.tId;

            console.log("tId :- " ,  tId);

            var latt;
            var lngt;
            var times;

            await axios.post("http://localhost:8000/get_location" , {tId}).then((response) => {
                console.log(response);
                latt = response.data.lat;
                lngt = response.data.lngt;
                times = response.data.last_upd;
            })

            // UTC time string
            const utcTimeString = times;

            // Convert the UTC time string to a Date object
            const utcTime = new Date(utcTimeString);

            // Get the UTC time components
            const utcHours = utcTime.getUTCHours();
            const utcMinutes = utcTime.getUTCMinutes();
            const utcSeconds = utcTime.getUTCSeconds();

            // Calculate the offset for Indian Standard Time (IST)
            const istOffsetHours = 5;
            const istOffsetMinutes = 30;

            // Construct the IST time components
            const istHours = (utcHours + istOffsetHours + 24) % 24;
            const istMinutes = utcMinutes + istOffsetMinutes;

            // Construct the IST time string
            const istTime = `${String(istHours).padStart(2, '0')}:${String(istMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}`;

            console.log('IST Time:', istTime);


            setTime(istTime)
            setLat(latt);
            setLng(lngt);


            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });
            

            // Add marker
            marker.current = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current);

            // Add popup
            if(time){
                const popup = new mapboxgl.Popup({ offset: 25 , className: 'custom-popup'  })
                    .setHTML(`<h4>Last Updated At :- </h4><p>${time}</p>`);

                marker.current.setPopup(popup);

            }

            // Clean up
            return () => {
                map.current.remove();
            };
        })
    }, [time]); // Run only once on component mount

     useEffect(() => {
        if (!map.current || !marker.current) return; // Wait for map and marker to be initialized
        map.current.setCenter([lng, lat]); // Update map center
        marker.current.setLngLat([lng, lat]); // Update marker position
    }, [lng, lat]);

  return (
    <div>
      <div style={{height : "100vh"}} ref={mapContainer} className="map-container" />
        <div className="mapboxgl-ctrl-top-right">
                <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                    <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in" type="button" aria-label="Zoom in" onClick={() => map.current.zoomIn()}> <span style={{marginTop : "2px"}} class="material-icons-sharp"> add </span> </button>
                    <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out" type="button" aria-label="Zoom out" onClick={() => map.current.zoomOut()}> <span style={{marginTop : "2px"}} class="material-icons-sharp"> remove </span></button>
                </div>
            </div>
    </div>

  )
}

export default LiveTracking