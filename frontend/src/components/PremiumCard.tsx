import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import addToCarts from "../utils/addToCart";
import { getProducts } from "../redux/actions/productAction";

import PremiumCardHandler from "../utils/products";

const PremiumCard = (props: any) => {
  let dispatch = useDispatch();

  let featuredProd = useSelector((state: any) => state.getProduct);
  const { products, loading, error } = featuredProd;
  let added = addToCarts(useDispatch, useSelector);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="top-letest-product-section">
      <div className="container">
        <div className="section-title">
          <h2>LATEST PRODUCTS</h2>
        </div>
        <div className="product-slider owl-carousel">
          {loading ? (
            <h1>LOADING....</h1>
          ) : error ? (
            <h1>No Product Found</h1>
          ) : (
            products
              .filter((prod: any) => prod.isFeatured === "true")
              .map((items: any) => {
                return (
                  <div className="product-item">
                    <div className="pi-pic">
                      <div className="tag-new">New</div>
                      <img
                        src={"http://localhost:8080/" + items.image}
                        alt={items.description}
                      />
                      <div className="pi-links">
                        <a className="add-card">
                          <i
                            className="fa fa-shopping-cart"
                            style={{ color: "#f51167" }}
                          ></i>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => added(`${items.id}`)}
                          >
                            ADD TO CART
                          </span>
                        </a>

                        <Link
                          to={`/product/${items.id}`}
                          className="wishlist-btn"
                        >
                          <i
                            className="fas fa-eye"
                            style={{ color: "#f51167" }}
                          ></i>
                        </Link>
                      </div>
                    </div>
                    <div className="pi-text">
                      <h6>#{items.price}</h6>
                      <p>{items.name}</p>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </section>
  );
};

export default PremiumCard;
