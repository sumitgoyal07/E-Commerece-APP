import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  let location = useLocation();

  return (
    <>

      <footer className="text-center footer" style={{ "color": "white", position:"relative" , top:"400px" }}>
        <div className="text-center">
          <h4 className='my-3'>All Right Reserved &copy; Sumit Goyal</h4>
        </div>
        <nav className='navbar navbar-expand-lg navbar-dark'>
          <ul className="navbar-nav mx-auto d-flex flex-row">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/About" ? "active" : " "} `} to="/About">👀About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/Contact" ? "active" : " "} `} to="/Contact">☎️Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/Privacy_Policy" ? "active" : " "} `} to="/Privacy_Policy">🗒️Privacy_Policy</Link>
            </li>
          </ul>
        </nav>
      </footer>

    </>
  )
}

export default Footer
