import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { Radio } from 'antd';
import prices from './Prices';
import { toast } from 'react-hot-toast';
import { useCart } from '../contextapi/Cartcontext';

function Home({ title, description, author, keyword }) {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();




  //get total count;

  const totalcount = async () => {
    try {
      const { data } = await axios.get(`${host}/api/v3/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    totalcount();
  }, []);



  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${host}/api/v2/category/getall-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, [])

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${host}/api/v3/product/product-list/${page}`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  
  //get load more products
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${host}/api/v3/product/product-list/${page}`);
      setPage(page+1);
      setProducts([...products , ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(()=>{
      loadmore() ;
      //eslint-disable-next-line
  },[])



  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);


  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(value => value !== id);
    }
    setChecked(all);

  }

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${host}/api/v3/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
      </Helmet>
      <div className="row mx-2">
        <div className="col-md-3 my-4">
          <h3>Filter By Category</h3>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handlefilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="d-flex flex-column">
            <h3 className='mt-3'>Filter By Prices</h3>
            <Radio.Group className='d-flex flex-column' onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id} >
                  <Radio value={p.array} >
                    {p.name}
                  </Radio>
                </div>

              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column mt-3">
            <button className='btn btn-danger btn-sm' style={{ width: "180px" }} onClick={() => { window.location.reload() }}>Reset Filters</button>
          </div>
        </div>

        <div className="col-md-9 my-4 text-center">
          <h1>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${host}/api/v3/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">Rs{p.price}</p>
                  <button className='btn btn-primary ms-1' onClick={()=>{navigate(`/product/${p.slug}`)}}>More Details</button>
                  <button className='btn btn-secondary ms-1'onClick={()=>{setCart([...cart , p]);
                  localStorage.setItem('cart',JSON.stringify([...cart,p]))
                  toast.success("item added to cart")}} >Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
          {products && products.length < total && (
            <button className='btn btn-warning' style={{position:"relative",left:"790px"}} onClick={(e)=>{
              e.preventDefault();
              loadmore()
            }}>{loading ? "Loading..." : "Load more" } </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
