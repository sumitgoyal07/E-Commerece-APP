import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
const {Option}= Select

function Createproduct() {
  const host = "http://localhost:5000";

  let location =useLocation();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const[category,setCategory]=useState("")

  //getallcaregries;
  const getall = async () => {
    try {
      const { data } = await axios.get(`${host}/api/v2/category/getall-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong In Getting Category');
    }
  }
  useEffect(() => {
    getall();   
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        `${host}/api/v3/product/create-product`,
        productData,
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


  return (
    <div className="container-fluid my-4">

      <div className="row">

      <div className="col-md-3">
      <h1 className='mx-1'>Admin Panel</h1>

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
          <h1>Createproduct</h1>

          <div className="m-1">
            <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
              {categories?.map((c)=>(
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}

            </Select>
          </div>
          <div className="">
            <label className='btn btn-outline-secondary col-md-12 mb-3'>
              {photo?photo.name:"Upload image"}
              <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
            </label>
          </div>

          <div className="mb-2">
            {photo&&(
              <div className="text-center">
                <img src={URL.createObjectURL(photo)} alt="product_photo" height={'50px'} className='img img-responsive' />
              </div>
            )}
          </div>
          <div className="mb-2">
              <input type="text" className=" form-control col-md-12"  name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Write a Product Name' />
          </div>
          <div className="mb-2">
              <textarea type="text" className=" form-control col-md-12"  name="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Write a Product Description' />
          </div>
          <div className="mb-2">
              <input type='number' className="form-control col-md-12"  name="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder='Select Quantity' />
          </div>
          <div className="mb-2">
              <input type='number' className="form-control col-md-12"  name="price" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Select Price' />
          </div>
          <Select bordered={false} placeholder="Select a Shiping Status" size='large' showSearch className='form-select mb-2' onChange={(value)=>{setShipping(value)}}>
          <Option value='1'>Yes</Option>
          <Option value='0'>No</Option>
            </Select>
            <div className="mb-2">
                <button className="btn btn-primary"onClick={handleCreate} >
                  CREATE PRODUCT
                </button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Createproduct
