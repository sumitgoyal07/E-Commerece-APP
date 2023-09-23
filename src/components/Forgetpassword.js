import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import {toast,Toaster } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';


function Forgetpassword({title,description,author,keyword}) {
    const host = "http://localhost:5000";

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate=useNavigate();

  
    const handlereset = async (e) => {
      e.preventDefault();
      try {
        const api = await axios.post(`${host}/api/v1/auth/forgot-password`, {
          email, newPassword, answer
        })
        if (api && api.data.success) {
          toast.success(api.data &&api.data.meassage);
          navigate('/Login')
        }else {
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
        <h2>Set-NewPassword</h2>
  
        <form>
        <div className="mb-3">
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required placeholder='Enter Your Email' />
        </div>
        <div className=" mb-3">
          <input type="text" className="form-control" id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} aria-describedby="answer" required  placeholder='Enter Your Fav. Sports' />
        </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="exampleInputPassword1" required placeholder='Enter New Password' />
          </div>
          <button type="submit" className="btn btn-success" onClick={handlereset}>Reset Password</button>
        </form>
      </div>
    )
}

export default Forgetpassword


