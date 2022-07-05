import React, { useState, useEffect } from "react";
import { getProductDetails } from "../redux/actions/productAction";
import { addToCart } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import addToCarts from "../utils/addToCart";
import { Link } from 'react-router-dom'
import url from "../constant/url";

const ProductCard = (props) => {
  let dispatch = useDispatch()
  let match = props.param;
  let product = useSelector((state) => state.getProduct);
  let prodDetails = product.products.filter(
    (prod) => prod.id == parseInt(match.params.id)
    );
    let added = addToCarts(useDispatch, useSelector);

  return (
    <section className="product__details">

        {prodDetails.map((items) => {
          return (
            
            <div class="description">
                <div class="description__left">
                <div class="description__image">
                    <img src={url + items.image} alt="IMG_0228.PNG"/>
                </div>
                <ul class="description__image-others">
                    <li class="description__image-others-1">
                        <img src={url + items.image} alt="IMG_0228.PNG"/>
                    </li>
                    <li class="description__image-others-2">
                        <img src={url + items.image} alt="IMG_0228.PNG"/>
                    </li>
                    <li class="description__image-others-3">
                        <img src={url + items.image} alt="IMG_0228.PNG"/>
                    </li>
                    <li class="description__image-others-4">
                        <img src={url + items.image} alt="IMG_0228.PNG"/>
                    </li>
                </ul>
                </div>
                <div class="description__right">
                    <div class="brief__description">
                        <h4><b>PRODUCT NAME: {items.name.charAt(0).toUpperCase().concat(items.name.slice(1))}</b></h4>
                    </div>
                    <div class="brief__description__rating_price">
                        <div class="rating">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star grey" aria-hidden="true"></i>
                            <i class="fa fa-star grey" aria-hidden="true"></i>
                        </div>
                    </div>
                    
                    
                    <div class="features__product">
                        <h4><b>PRODUCT DESCRIPTION</b></h4>
                        <ul>
                            <li>- {items.desc} </li>
                        </ul>
                    </div>
                    <div class="features__product">
                        <h4><b>CASH ON DELIVERY</b></h4>
                        <ul>
                            <p><li>-  Not Avaliable</li></p>  
                        </ul>
                    </div>
                    <div class="features__product">
                        <h4><b>SHIPMENT DESCRIPTION</b></h4>
                        <ul>
                            <li>- Tuesday or Friday </li>
                        </ul>
                    </div>
                    <div class="features__product">
                        <h4><b>REPLACEMENT </b></h4>
                        <ul>
                            <li>- Tuesday or Friday </li>
                        </ul>
                    </div>
                    <button type="button" class=" btn-cart" onClick={() => added(`${items.id}`, items.fullbag)} >{`Full Bag (${items.fullbag})`}</button>  <br />
                    <button type="button" class=" btn-cart" onClick={() => added(`${items.id}`, items.halfbag)} >{`Half Bag (${items.halfbag})`}</button> <br />
                    <button type="button" class=" btn-cart" onClick={() => added(`${items.id}`, items.quaterbag)} >{`Quater Bag (${items.quaterbag})`}</button>
                </div>
            </div>
                    
        );
        })}
    </section>
  );
};

export default ProductCard;
