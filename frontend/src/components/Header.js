import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem("userId"));
  }, [localStorage.getItem("userId")]);

  return (
    <header>
      <div id="headerTitle">
        <h1>Les Pierres Folles</h1>
        <p>Voyage au coeur des mégalithes</p>
      </div>
      <div id="headerOptions">
        <nav id="headerNav">
          <Link to={"/accueil"}>
            <div className="linkToAccueil">
              <svg viewBox="0 0 24 24" fill="rgb(250, 235, 215)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
          </Link>
          <Link to={"/search"}>
            <div className="linkToSearch">
              <svg viewBox="0 0 24 24" fill="rgb(250, 235, 215)">
                <path d="M19.3,16.9c0.4-0.7,0.7-1.5,0.7-2.4c0-2.5-2-4.5-4.5-4.5S11,12,11,14.5s2,4.5,4.5,4.5c0.9,0,1.7-0.3,2.4-0.7l3.2,3.2 l1.4-1.4L19.3,16.9z M15.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,17,15.5,17z M12,20v2 C6.48,22,2,17.52,2,12C2,6.48,6.48,2,12,2c4.84,0,8.87,3.44,9.8,8h-2.07c-0.64-2.46-2.4-4.47-4.73-5.41V5c0,1.1-0.9,2-2,2h-2v2 c0,0.55-0.45,1-1,1H8v2h2v3H9l-4.79-4.79C4.08,10.79,4,11.38,4,12C4,16.41,7.59,20,12,20z" />
              </svg>
            </div>
          </Link>
          <Link to={"/create"}>
            <div className="linkToCreate">
              <svg viewBox="0 0 24 24" fill="rgb(250, 235, 215)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
          </Link>
          <Link to={"/connection"}>
            <div className="linkToConnexion">
              <svg viewBox="0 0 24 24" fill="rgb(250, 235, 215)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
              </svg>
            </div>
          </Link>
        </nav>
        {user && <p id="welcomer">Bienvenue, {user} !</p>}
      </div>
    </header>
  );
};

export default Header;
