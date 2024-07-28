import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Nav from "./components/Nav";
import Emails from "./components/Emails";
import Unblure from "./components/Unblure";
import Payment from "./components/Payment";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <Nav />
        <Routes>
          <Route path="/" element={<Emails />} />
          <Route path="/unblure" element={<Unblure />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
