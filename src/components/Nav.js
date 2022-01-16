import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faTimes, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Nav = ({libraryStatus,setLibraryStatus,darkMode,setDarkMode}) => {
    return(
        <nav>
            <h1>Waves</h1>
            <div className="nav-button-container">
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                {libraryStatus ? 'Close' : ''} Library <FontAwesomeIcon icon={libraryStatus ? faTimes : faMusic} />
            </button>
            <button onClick={() => setDarkMode(!darkMode)}><span className="dark-mode-label">{!darkMode ? 'Dark Mode' : 'Light Mode'}</span> <FontAwesomeIcon icon={!darkMode ? faMoon : faSun} /></button>
            </div>
        </nav>
    );
}

export default Nav;