import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Emails</Link>
        </li>
        <li>
          <Link to="/unblure">Unblure</Link>
        </li>
        <li>
          <Link to="/payment">Payment</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
