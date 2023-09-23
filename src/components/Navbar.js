import React from 'react';
import {Link,useLocation } from 'react-router-dom';
import { useAuth } from '../contextapi/Authcontext';
import { toast } from 'react-hot-toast';
import Searchinput from './Searchinput';
import { useCart } from '../contextapi/Cartcontext';

function Navbar() {
  let location=useLocation();
  const [auth,setAuth]=useAuth();
  const [cart]=useCart();

 const handlelogout=()=>{
       setAuth({
        ...auth,
        user:null,
        token:" "
       })
       localStorage.removeItem('auth');
       toast.success('Logout Successfully')
  }
  return (
    <div>
      
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"> 🛒 E-Commerce</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <Searchinput/>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "active" :" "} `} aria-current="page" to="/">Home</Link>
        </li>
        {
          !auth.user?(<>
          <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/Register" ? "active" :" "}`} to="/Register">Register</Link>
        </li>
        <li className="nav-item">
        <Link className={`nav-link ${location.pathname === "/Login" ? "active" :" "}`} to="/Login">Login</Link>
        </li>
          </>) :
          (<> 

<div className="navbar-nav ms-auto mb-2 mb-lg-0 dropdown ">
  <button className="btn btn-secondary dropdown-toggle navbar-dark bg-dark mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
{auth?.user?.name}  </button>
  <ul className="dropdown-menu navbar-dark bg-dark ">
  <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/Register" ? "active" :" "}`} to ={`/Dashboard/${auth?.user?.role===1 ? "admin" : "user"}`}   >Dashboard</Link>
        </li>
  <li className="nav-item navbar-dark bg-dark">
        <Link onClick={handlelogout} className={`nav-link ${location.pathname === "/Login" ? "active" :" "}`} to="/Login">Logout</Link>
        </li> 
  </ul>
</div>

        </>)      
        
        }

        <li className="nav-item">
        <Link className={`nav-link ${location.pathname === "/Cart" ? "active" :" "}`} to="/Cart">Cart({cart?.length})</Link>
        </li>
      </ul>
    </div>
  </div>
  
</nav>
      
    </div>
  )
}

export default Navbar
