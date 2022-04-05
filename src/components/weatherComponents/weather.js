import React from 'react';
import moment from 'moment';

import '../../assets/styles.css';

export default function weather({weatherData}) {
  
  return (
    <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Description</th>
            <th>Main</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{moment().format('MMMM DD YY')}</td>
            <td>{weatherData.temperature}&deg;C</td>
            <td>{weatherData.description}</td>
            <td>{weatherData.main}</td>
            <td>{weatherData.pressure}</td>
            <td>{weatherData.humidity}</td>
          </tr>
        </tbody>
    </table>
 
  )
}

 //   <div className="main">
  //     <div className="flex">
  //       <table>
  //         <thead>
  //           <tr>
  //             <td><p className="temp">Date</p></td>
  //             <td><p className="temp">Temperature</p></td>
  //             <td><p className="temp">Description</p></td>
  //             <td><p className="temp">Main</p></td>
  //             <td><p className="temp">Pressure</p></td>
  //             <td><p className="temp">Humidity</p></td>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //             <td><p className="temp"><span>{moment().format('MMM Do YY')}</span></p></td>
  //             <td><p className="temp">{weatherData.description}</p></td>
  //             <td><p className="temp">{weatherData.temperature}</p></td>
  //             <td><p className="temp">{weatherData.main}</p></td>
  //             <td><p className="temp">{weatherData.pressure}</p></td>
  //             <td><p className="temp">{weatherData.humidity} %</p></td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  // </div>