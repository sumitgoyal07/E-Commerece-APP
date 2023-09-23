import React, { useState, useEffect } from 'react'
import { Link, useLocation,useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Products = () => {
  const host = "http://localhost:5000";

  let location = useLocation();
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${host}/api/v3/product/getall-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <div className="container-fluid my-4">
      <div className="row">

        <div className="col-md-3">
          <h1 className='mx-1'>Admin Panel</h1>

          <div class="list-group">
            <Link to="/Dashboard/admin/Create-Category" class={`list-group-item list-group-item-action ${location.pathname === "/Dashboard/admin/Create-Category" ? "active" : " "}`} aria-current="true">
              Create-Category
            </Link>
            <Link to="/Dashboard/admin/Create-Product" class={`list-group-item list-group-item-action ${location.pathname === "/Dashboard/admin/Create-Product" ? "active" : " "}`}>Create-Product</Link>
            <Link to="/Dashboard/admin/Adminorder" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/User" ? "active" : " "}`}>AdminOrders</Link>
            <Link to="/Dashboard/admin/Products" class={`list-group-item list-group-item-action ${location.pathname === "/Dashboard/admin/Products" ? "active" : " "}`}>Products</Link>
          </div>
        </div>

        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${host}/api/v3/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>


  )
}

export default Products
