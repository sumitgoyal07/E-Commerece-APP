import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contextapi/Authcontext';

function Admindash({ title, description, author, keyword }) {
  let location=useLocation();
  const[auth]=useAuth();
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
        <h1 className='mx-1'>Admin Panel</h1>
<div className="row">
<div className="col-md-3">
<div class="list-group">
  <Link to="/Dashboard/admin/Create-Category" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/Create-Category" ? "active" : " "}`} aria-current="true">
    Create-Category
  </Link>
  <Link to="/Dashboard/admin/Create-Product" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/Create-Product" ? "active" : " "}`}>Create-Product</Link>
  <Link to="/Dashboard/admin/Adminorder" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/User" ? "active" : " "}`}>AdminOrders</Link>
  <Link to="/Dashboard/admin/Products" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/Products" ? "active" : " "}`}>Products</Link>

</div>
</div>  
          <div className="col-md-9">
              <div className="card w-50">
                <h3>Admin Name : {auth?.user?.name}</h3>
                <h3>Admin Email : {auth?.user?.email}</h3>
                <h3>Admin Contact : {auth?.user?.phone}</h3>


              </div>
          </div>
</div>
  
</div>      
    </div>
  )
}

export default Admindash
