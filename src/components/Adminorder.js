import { Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import { useAuth } from '../contextapi/Authcontext';
const { Option } = Select;



function Adminorder() {
  const host = "http://localhost:5000";
  let location = useLocation();
  const [status,setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${host}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${host}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-md-3">
          <h1>Admin Panel</h1>
          <div class="list-group">
            <Link to="/Dashboard/admin/Create-Category" class={`list-group-item list-group-item-action ${location.pathname === "/Dashboard/admin/Create-Category" ? "active" : " "}`} aria-current="true">
              Create-Category
            </Link>
            <Link to="/Dashboard/admin/Create-Product" class={`list-group-item list-group-item-action ${location.pathname === "/Dashboard/admin/Create-Product" ? "active" : " "}`}>Create-Product</Link>
            <Link to="/Dashboard/admin/Adminorder" class={`list-group-item list-group-item-action ${location.pathname === "/Dashboard/admin/Adminorder" ? "active" : " "}`}>AdminOrders</Link>
            <Link to="/Dashboard/admin/Products" class={`list-group-item list-group-item-action ${location.pathname === "/Dashboard/admin/Products" ? "active" : " "}`}>Products</Link>

          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
  
          </div>


          
  )
}

export default Adminorder
