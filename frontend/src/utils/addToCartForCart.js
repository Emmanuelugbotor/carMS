import React from "react";
import { addToCart } from "../redux/actions/cartActions";

const AddToCard = (useDispatch, useSelector) => {
  let dispatch = useDispatch();
  let product = useSelector((state) => state.cart);
  
  const addToCartController = async (id, qty) => {
    console.log("find id", id, qty)
    let prodDetails = product.cartItems.find((prod) => prod.id == parseInt(id));
    console.log(prodDetails)
    dispatch(addToCart(prodDetails, qty));

  }; 

  return addToCartController;
};
  
export default AddToCard;

