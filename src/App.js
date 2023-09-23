import './App.css';
import './components/style/formstyle.css'
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Privacy_Policy from './components/Privacy_Policy';
import Footer from './components/footer/Footer';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Forgetpassword from './components/Forgetpassword';
import Adminprivate from './components/Adminprivate';
import Admindash from './components/Admindash';
import Createproduct from './components/Createproduct';
import Createcategory from './components/Createcategory';
import Adminorder from './components/Adminorder';
import Products from './components/Products';
import Updateproducts from './components/Updateproducts';
import Search from './components/Search';
import ProductDetails from './components/Productsdetails';
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Toaster />
      <Router>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home title={'Home-ECommerce App'} description={'this home page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
          <Route path="/search" element={<Search title={'Home-ECommerce App'} description={'this home page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
          <Route path="/product/:slug" element={<ProductDetails title={'Home-ECommerce App'} description={'this home page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />


          <Route path="/Register" element={<Register title={'Register-ECommerce App'} description={'this register page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
          <Route path="/Forget" element={<Forgetpassword title={'Forget-ECommerce App'} description={'this Forget page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />

          <Route path="/Login" element={<Login title={'login-ECommerce App'} description={'this login page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />

          <Route path="/Dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard title={'Dashboard-ECommerce App'} description={'this Dashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
            <Route path="user/Profile" element={<Profile title={'userDashboard-ECommerce App'} description={'this userDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
            <Route path="user/Orders" element={<Orders title={'userDashboard-ECommerce App'} description={'this userDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
          </Route>

          <Route path="/Dashboard" element={<Adminprivate />}>
            <Route path="admin" element={<Admindash title={'AdminDashboard-ECommerce App'} description={'this AdminDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
            <Route path="admin/Create-category" element={<Createcategory title={'AdminDashboard-ECommerce App'} description={'this AdminDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
            <Route path="admin/Create-product" element={<Createproduct title={'AdminDashboard-ECommerce App'} description={'this AdminDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
            <Route path="admin/Adminorder" element={<Adminorder title={'AdminDashboard-ECommerce App'} description={'this AdminDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
            <Route path="admin/product/:slug" element={<Updateproducts title={'Products-ECommerce App'} description={'this AdminDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
            <Route path="admin/Products" element={<Products title={'Products-ECommerce App'} description={'this AdminDashboard page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />


          </Route>

          <Route path="/Cart" element={<Cart title={'cart-ECommerce App'} description={'this cart page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
          <Route path="/About" element={<About title={'About-ECommerce App'} description={'this about page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
          <Route path="/Contact" element={<Contact title={'Contact-ECommerce App'} description={'this contact page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />
          <Route path="/Privacy_Policy" element={<Privacy_Policy title={'Privacy_Policy-ECommerce App'} description={'this Privacy_Policy-E-Commerce-App page of e-commerece app'} author={'sumit goyal'} keyword={'e-commerece , shopping app'} />} />




        </Routes>

        <Footer />


      </Router>



    </>
  );
}

export default App;
