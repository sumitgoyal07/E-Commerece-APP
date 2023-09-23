import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Spinner = ({path="Login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
   const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => --count);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
         state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate,location,path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;