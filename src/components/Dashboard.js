import React from 'react';
import { Helmet } from "react-helmet";
import { useAuth } from '../contextapi/Authcontext';
import { Link, useLocation } from 'react-router-dom'


function Dashboard( { title, description, author, keyword }) {
  const[auth]=useAuth();
  let location=useLocation();

  return (
    <div>
        <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
      </Helmet>
      <div className="container-fluid my-4">
        <h1 className='mx-1'>User Panel</h1>
<div className="row">
<div className="col-md-3">
<div class="list-group">
  <Link to="/Dashboard/user/Profile" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/Create-Product" ? "active" : " "}`}>Profile</Link>
  <Link to="/Dashboard/user/Orders" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/User" ? "active" : " "}`}>Orders</Link>
</div>
</div>  
          <div className="col-md-9">
              <div className="card w-50">
                <h3>User Name : {auth?.user?.name}</h3>
                <h3>User Email : {auth?.user?.email}</h3>
                <h3>User Contact : {auth?.user?.phone}</h3>


              </div>
          </div>
</div>
  
</div>
      
    </div>
  )
}

export default Dashboard
