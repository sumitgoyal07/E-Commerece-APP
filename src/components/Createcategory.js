import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {  Modal } from 'antd';


function Createcategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedname, setUpdatedname] = useState("");
  const [selected, setSelected] = useState(null);




  let location = useLocation();
  const host = "http://localhost:5000";

  //createcategory;
  const handletocreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${host}/api/v2/category/create-category`, {
        name,

      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getall();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }


  }


  //getallcaregries;
  const getall = async () => {
    try {
      let { data } = await axios.get(`${host}/api/v2/category/getall-category`);
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

  //updaate categories;
   const handletoedit=async(e)=>{
e.preventDefault();
try {
  const { data } = await axios.put(`${host}/api/v2/category/update-category/${selected}`,{name:updatedname});
  if (data?.success) {
    toast.success(`${updatedname} is updated`);
    setSelected(null);
    setVisible(false);
    setUpdatedname("")
    getall();
  } else {
    toast.error(data.message);
  }
} catch (error) {
  console.log(error);
}

   }

   //delete categories;
   const handletodelete=async(_id)=>{
    try {
      const { data } = await axios.delete(`${host}/api/v2/category/delete-category/${_id}`);
      if (data?.success) {
        toast.success('Category is deleted');
        getall();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    
       }
    


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
            <Link to="/Dashboard/admin/Products" class={`list-group-item list-group-item-action ${location.pathname==="/Dashboard/admin/Products" ? "active" : " "}`}>Products</Link>

          </div>
        </div>

        <div className="col-md-3 mx-5">
          <h1>ManageCategory</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <>
                  <tr>

                    <td key={c._id}>{c.name}</td>
                    <td>
                      <button className='btn btn-primary mx-2' onClick={() => {setVisible(true) ; setUpdatedname(c.name) ; setSelected(c._id)}}>Edit</button>
                      <button className='btn btn-danger' onClick={()=>handletodelete(c._id)}>Delete</button>

                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <form>
            <div class="mb-3">
              <input type="text" class="form-control" id="exampleInputtext1" aria-describedby="texthelp" placeholder='Enter Category Name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary" onClick={handletocreate}>CreateCategory</button>
          </form>

          <Modal
            onCancel={() => { setVisible(false) }}
            footer={null}
            visible={visible}
          >
            <form>
              <div class="mb-3">
                <input type="text" class="form-control" id="exampleInputtext1" aria-describedby="texthelp" value={updatedname} onChange={(e) => setUpdatedname(e.target.value)} />
              </div>
              <button type="submit" class="btn btn-primary" onClick={handletoedit}>UpdateCategory</button>
            </form>
          </Modal>

 

        </div>
      </div>
    </div>
  )
}

export default Createcategory
