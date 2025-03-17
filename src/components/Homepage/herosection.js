import React, { useState, useEffect } from "react";
import Axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  const [data, setData] = useState("");

  // ✅ Define getData BEFORE useEffect
  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/getData");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(); // ✅ Now it recognizes getData
  }, []);

  return (
    <div
      className="hero-section text-center text-white d-flex flex-column align-items-center justify-content-center p-5"
      style={{
        background: "url('logo.png') no-repeat center/cover",
        height: "50vh",
        width: "100%",
      }}
    >
      {/* <h1>Why Buy When You Can Rent</h1> */}
      <div className="mt-3">
        
        
      </div>
    </div>
  );
};

export default HeroSection;
