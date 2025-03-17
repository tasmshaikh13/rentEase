import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"; // ✅ Import axios for API requests
import "bootstrap/dist/css/bootstrap.min.css";
import RentEaseNavbar from "./components/Homepage/header";
import HeroSection from "./components/Homepage/herosection";
import Categories from "./components/Homepage/Categories";
import Recommendations from "./components/Homepage/Recommendations";
import ListItem from "./components/listitm/ListItem";
import Footer from "./components/Homepage/Footer";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  // ✅ Fetch backend data when the app loads
  useEffect(() => {
    axios.get("http://localhost:5000/api/test") // Ensure backend is running
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("❌ Error connecting to backend:", error);
      });
  }, []);

  return (
    <Router>
      <RentEaseNavbar />
      <Routes>
        {/* ✅ Home Page Route */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <HeroSection />
              <Categories />
              <Recommendations />
              <p className="api-message">🔗 {message}</p> {/* ✅ Display backend message */}
              <Footer />
            </div>
          }
        />

        {/* ✅ Lister Page Route */}
        <Route path="/List" element={<ListItem />} />
      </Routes>
    </Router>
  );
}

export default App;
