import React ,{useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contextapi/Authcontext';
import axios from 'axios';
import moment from "moment";
function Orders() {
  const host = "http://localhost:5000";
    let location =useLocation();
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();


    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${host}/api/v1/auth/orders`);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);
   

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
          <h1>All Orders</h1>
        </div>
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
                        <td>{o?.status}</td>
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
                            src={`${host}/api/v3/product/product-photo/${p._id}`}
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
  )
}

export default Orders
