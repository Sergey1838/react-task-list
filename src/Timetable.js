import React, { Component } from 'react';
import './Timetable.css';

class Timetable extends Component{
    render(){
      return(
        <ul className="schedule">
          <hr/>
          <li>8:00</li>
          <li>8:30</li>
          <hr/>
          <li>9:00</li>
          <li>9:30</li>
          <hr/>
          <li>10:00</li>
          <li>10:30</li>
          <hr/>
          <li>11:00</li>
          <li>11:30</li>
          <hr/>
          <li>12:00</li>
          <li>12:30</li>
          <hr/>
          <li>1:00</li>
          <li>1:30</li>
          <hr/>
          <li>2:00</li>
          <li>2:30</li>
          <hr/>
          <li>3:00</li>
          <li>3:30</li>
          <hr/>
          <li>4:00</li>
          <li>4:30</li>
          <hr/>
          <li>5:00</li>
        </ul>
      );
    }
  }
  
  export default Timetable;