import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import {toast,Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contextapi/Authcontext';
import { useLocation } from 'react-router-dom';


function Login({ title, description, author, keyword }) {
  const host = "http://localhost:5000";

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth,setAuth] = useAuth();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const api = await axios.post(`${host}/api/v1/auth/login`, {
        email, password
      })
      if (api && api.data.success) {
        toast.success(api.data.meassage);
        setAuth({
          ...auth,
          user:api.data.user,
          token:api.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(api.data));
        navigate(location.state || "/");
        
      } else {
        toast.error(api.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  return (
    <div className='d-flex my-5 flex-column align-items-center justify-content-center'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
      </Helmet>
      <Toaster />
      <h2>Login-Form</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" required />
        </div>
        <button type="submit" className="btn btn-success" onClick={handlelogin}>Login</button>
        <div className='d-flex my-2'>
        <button type="submit" className="btn btn-success" onClick={()=>navigate("/Forget")}>Forget Password</button>
        </div>
      </form>
    </div>
  )
}

export default Login
