import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './workSessions/session_design.css';

class Navigation extends Component {


  render() {

    return (

      <div class="navigation_header">
        <div>
          <NavLink class="navigation_link" to="/">Home</NavLink>
          <NavLink class="navigation_link"  to="/highScores">High Scores</NavLink>
        </div>
      </div>

/*
    <header>
      <h4 class="logo">Aim Training</h4>
      <nav>
        <ul class="nav_links">
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
      <button type="button" class="btn btn-secondary cta">TEST BUTTON</button>
    </header>
    */
    );
    
  }

}
export default Navigation;
