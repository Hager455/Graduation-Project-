import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoIosMoon, IoMdSunny } from 'react-icons/io';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';
const Navbar = () => {
    const [showNav, setShowNav] = useState(window.innerWidth > 600 ? true : false);
    
// useState to check if dark theme is enabled or not
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem
    ('voting-app-theme')  || "");

// function to close nav menu on small screenswhen menu link is clicked
    const closeNavMenu = () => {
        if(window.innerWidth < 600) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
    }

// function to toggle dark theme
    const changeThemeHandler = () => {
      if(localStorage.getItem('voting-app-theme') === 'dark') {
        localStorage.setItem('voting-app-theme', '');
      } else {
        localStorage.setItem('voting-app-theme', 'dark');
      }
      setDarkTheme(localStorage.getItem('voting-app-theme'));
    }

    useEffect(() => {
      document.body.className =localStorage.getItem('voting-app-theme');
    }, [darkTheme])



  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">VOTA</Link>
        <div>
          {showNav && <menu>
            <NavLink to="/elections" onClick={closeNavMenu}>Elections</NavLink>
            <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
            <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
          </menu>}
          <button className="theme__toggle-btn" onClick={changeThemeHandler}>{darkTheme ? <IoMdSunny /> :
          <IoIosMoon />}</button>
          <button className="nav__toggle-btn" onClick={() => 
          setShowNav(!showNav)}>{showNav ? <AiOutlineClose /> :
          <HiOutlineBars3 />}</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar