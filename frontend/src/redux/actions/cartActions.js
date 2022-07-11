import * as actionTypes from "../constants/cartConstant";

export const addToCart = (data, qty) => async (dispatch, getState) => {
  // console.log("verifying data from line 4 in cartAction.js", data[0].id, data.id)
  var quantity = 1;
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {

      product: data.id,
      id: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      brand: data.brand,
      description: data.desc,
      countInStock: parseInt(data.countInStock),
      qty: qty === undefined ? (qty = quantity) : qty,
      fullbag: data.fullbag,
      halfbag: data.halfbag,
      quaterbag: data.quaterbag,
      sellingPrice: parseInt(qty),

    },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};




export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
}