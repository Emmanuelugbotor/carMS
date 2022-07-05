import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import addToCarts from "../utils/addToCart";
import url from "../constant/url";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const Cards = (props) => {
  let share = useRef();
  let history = useHistory();
  let { id, image, price, name, quaterbag, fullbag, halfbag, desc } = props;
  const dispatch = useDispatch();
  let product = useSelector((state) => state.getProduct);
  let added = addToCarts(useDispatch, useSelector);
  let addToCartController = (id) => {
    let prodDetails = product.products.find(
      (prod) => prod.id == parseInt(id)
    );
    dispatch(addToCart(prodDetails));
  };

  
  const shareLink =(id)=>{
    navigator.clipboard.writeText(id);
    alert("Link copied to clipboard")
  }

  return (
    <>

      <div className="card">
        <div className="imgBox">
          <img src={url + image} alt="Onefarmtech Product" />
          <ul className="action">

            <li onClick={() => added(`${id}`, fullbag)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span>Full Bag (#{fullbag}) </span>
            </li>

            <li onClick={() => added(`${id}`, halfbag)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span>Half Bag (#{halfbag}) </span>
            </li>

            <li onClick={() => added(`${id}`, quaterbag)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span>Quater Bag (#{quaterbag}) </span>
            </li>

            <li onClick={()=> history.push(`/product/${id}`)}>
              <Link to={`/product/${id}`}>
                <i className="fa fa-eye" aria-hidden="true">
                </i>
                <span>View Details</span>
              </Link>
            </li>

            <li onClick={()=>{shareLink(`https://onefarmtech.com/product/${id}`)}} >
              <i className="fa fa-share" aria-hidden="true"></i>
              <span>Share</span>
            </li>
          

          </ul>
        </div>
        <div className="content">
          <div className="product__name">
            <h3>{name}</h3>
          </div>
          <div className="price__rating">
            <div className="rating">
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star grey" aria-hidden="true"></i>
              <i className="fa fa-star grey" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
