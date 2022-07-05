import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const CartButton = (props) => {

    let cartItems = useSelector((state) => state.cart);
    let numOfCartItems = cartItems.cartItems.length;

  return (
    <Link to="/cart">
      <button
        id="whatsapp"
        className="whatsapp"
        style={{
          position: "fixed",
          textAlign: "center",
          zIndex: 100,
          width: "60px",
          height: "60px",
          bottom: "2rem",
          right: "4rem",
          borderRadius: "50px",
          borderColor: "#25d366",
        }}
      >
        <i
          className="fa fa-shopping-cart"
          style={{  color: "white" }}
        > {numOfCartItems} </i>
      </button>
    </Link>
  );
};

export default CartButton;
