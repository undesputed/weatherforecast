import React, { useContext, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import Styled from "styled-components";

import { AuthContext } from "../App";
import '../assets/home.css';

export default function Home() {
    const [location, setLocation] = useState("");

    const history = useHistory();

    const { state, dispatch } = useContext(AuthContext);

    if (!state.isLoggedIn) {
        return <Redirect to="/landing" />;
    }

    const { avatar_url, name, html_url } = state.user

    const handleLogout = () => {
        dispatch({
        type: "LOGOUT"
        });
    } 

    const handleResponse = (response) => {
        if(response.ok){
            return response.json();
        }else {
            throw new Error("Error Finding this location")
        }
    }

    const getGeoApi = () => {
        return fetch(
            `${process.env.REACT_APP_GEOCODIN_API_URL}/direct?q=${location}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
        )
            .then(res => handleResponse(res))
            .then(weather => {
                handleRedirect(weather[0].lat, weather[0].lon);
            });
    }

    const handleRedirect= (latitude, longitude) => {
        return history.push("/weatherforecast", {lat: latitude, long: longitude});
    }

    return ( 
        <div className="container">
            <nav className="navbar">
                <div className="logo">
                    Weather Forecasts
                </div>
                <ul className="nav-links">
                    <input type="checkbox" id="checkbox_toggle"/>
                    <label className="hamburger">&#9776;</label>
                    <div className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/landing">Landing</Link></li>
                        <li><button onClick={() => handleLogout()}>Logout</button></li>
                    </div>
                </ul>
            </nav>
            {/* <button onClick={()=> handleLogout()}>Logout</button> */}
            <div>
                <div className="content">
                    <img src={avatar_url} alt="Avatar"/>
                    <span>{name}</span>
                    <span>{html_url}</span>
                    <span>
                        <input
                            type="text"
                            value={location}
                            placeholder="Enter A City"
                            onChange={e => setLocation(e.target.value)}
                        />
                            <button onClick={() => getGeoApi()} className="weather-forecast">
                                Weather Forecast
                            </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

// const Wrapper = Styled.section`
// .container{
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   font-family: Arial;

//   button{
//     all: unset;
//     width: 100px;
//     height: 35px;
//     margin: 10px 10px 0 0;
//     align-self: flex-end;
//     background-color: #0041C2;
//     color: #fff;
//     text-align: center;
//     border-radius: 3px;
//     border: 1px solid #0041C2;

//     &:hover{
//       background-color: #fff;
//       color: #0041C2;
//     }
//   }

//   >div{
//     height: 100%;
//     width: 100%;
//     display: flex;
//     font-size: 18px;
//     justify-content: center;
//     align-items: center;

//     .content{
//       display: flex;
//       flex-direction: column;
//       padding: 20px 100px;    
//       box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
//       width: auto;
  
//       img{
//         height: 150px;
//         width: 150px;
//         border-radius: 50%;
//       }
  
//       >span:nth-child(2){
//         margin-top: 20px;
//         font-weight: bold;
//       }
  
//       >span:not(:nth-child(2)){
//         margin-top: 8px;
//         font-size: 14px;
//       }
  
//     }

//   }
// }
// `;
