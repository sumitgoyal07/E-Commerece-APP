import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register({ title, description, author, keyword }) {
  const host = "http://localhost:5000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");


  const navigate = useNavigate();


  //register function;
  const handlesubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${host}/api/v1/auth/register`, {
      name, email, password, phone, address, answer
    })
    if (res && res.data.success) {
      toast.success(res.data && res.data.message);
      navigate("/Login")
    }
    else {
      toast.error(res.data.message)
    }

  };

  return (
    <div className='form-container d-flex  flex-column align-items-center justify-content-center '>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
      </Helmet>
      <Toaster />
      <h2>Registration-Form</h2>

      <form className='form-border'>
        <div className=" mb-3">
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="name" required placeholder='Enter Your Name' />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required placeholder='Enter Your Email'/>
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" required  placeholder='Enter Your Password' />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} aria-describedby="phone" required  placeholder='Enter Phone No.' />
        </div>
        <div className="mb-3 ">
          <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="address" required  placeholder='Enter Your Address' />
        </div>
        <div className=" mb-3">
          <input type="text" className="form-control" id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} aria-describedby="answer" required  placeholder='Enter Your Fav. Sports' />
        </div>
        <button type="submit" className="btn btn-success" onClick={handlesubmit}>Register</button>
      </form>

    </div>
  )
}

export default Register
