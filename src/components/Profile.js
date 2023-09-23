import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { toast} from 'react-hot-toast';
import { useAuth } from '../contextapi/Authcontext';


function Profile() {
  const host = "http://localhost:5000";

    let location =useLocation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [auth,setAuth] = useAuth();


    //register function;
  const handlesubmit = async () => {

    const {data} = await axios.put(`${host}/api/v1/auth/profile`, {
      name, email, password, phone, address
    });
    if (data?.error) {
      toast.error(data?.error)
    }
    else {
      setAuth({...auth,user:data?.updateprofile});
      let ls =localStorage.getItem('auth')
      ls=JSON.parse(ls);
      ls.user=data.updateprofile;
      localStorage.setItem('auth' , JSON.stringify(ls))

      toast.success('Profile update successfully');
    }

  };

  useEffect(()=>{
    const {name,email,password,phone,address}=auth.user
    setName(name)
    setEmail(email)
    setAddress(address)
    setPassword(password)
    setPhone(phone)
  },[auth.user])

   

  return (
<div className="container-fluid my-4">
      <div className="row">
      <div className="col-md-3">
      <h1 className='mx-1'>User Panel</h1>

<div class="list-group">
  <Link to="/Dashboard/user/Profile" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/user/Profile" ? "active" : " "}`}>Profile</Link>
  <Link to="/Dashboard/user/Orders" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/user/Orders" ? "active" : " "}`}>Orders</Link>

</div>
</div>  

        <div className="col-md-9">
          <h1>User Profile</h1>
          <h2>Registration-Form</h2>

      <form className='form-border'>
        <div className=" mb-3">
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="name" required placeholder='Enter Your Name' />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required placeholder='Enter Your Email' disabled/>
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
        
        <button type="submit" className="btn btn-success" onClick={handlesubmit}>Update</button>
      </form>

        </div>
        
      </div>
    </div>
  )
}

export default Profile
