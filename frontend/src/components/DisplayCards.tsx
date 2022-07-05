import React from "react";
import { Link } from "react-router-dom"

import "../App.css";

const DisplayCard = () => {
  return (
    <section className="top-letest-product-section">
      <div className="container">
        <div className="section-title">
          <h2>LATEST PRODUCTS</h2>
        </div>
        <div className="product-slider owl-carousel">
          <div className="product-item">
            <div className="pi-pic">
              <img
                src="images/fas6.jpg"
                alt="sdsd"
                style={{ display: "none", visibility: "hidden" }}
              />
              <noscript>
                <img src="images/1.jpg" alt="sdsd" />
              </noscript>
              <div className="pi-links">
                <Link to="/" className="add-card">
                  <i
                    className="fa fa-shopping-cart"
                    style={{ color: "#f51167" }}
                  ></i>
                  <span>ADD TO CART</span>
                </Link>
                <Link to="/" className="wishlist-btn">
                  <i className="fas fa-heart" style={{ color: "#f51167" }}></i>
                </Link>
              </div>
            </div>
            <div className="pi-text">
              <h6>$35,00</h6>
              <p>Flamboyant Pink Top </p>
            </div>
          </div>

          <div className="product-item">
            <div className="pi-pic">
              <div className="tag-new">New</div>
              <img
                src="images/fas7.png"
                alt="sdsd"
                style={{ display: "none", visibility: "hidden" }}
              />
              <noscript>
                <img src="images/2.jpg" alt="sdsd" />
              </noscript>
              <div className="pi-links">
                <Link to="/" className="add-card">
                  <i
                    className="fa fa-shopping-cart"
                    style={{ color: "#f51167" }}
                  ></i>
                  <span>ADD TO CART</span>
                </Link>
                <Link to="/" className="wishlist-btn">
                  <i className="fas fa-heart" style={{ color: "#f51167" }}></i>
                </Link>
              </div>
            </div>
            <div className="pi-text">
              <h6>$35,00</h6>
              <p>Light pinky Stripes Dress</p>
            </div>
          </div>
          <div className="product-item">
            <div className="pi-pic">
              <img
                src="images/fas8.jpg"
                alt="sdsd"
                style={{ display: "none", visibility: "hidden" }}
              />
              <noscript>
                <img src="images/3.jpg" alt="sdsd" />
              </noscript>
              <div className="pi-links">
                <Link to="/" className="add-card">
                  <i
                    className="fa fa-shopping-cart"
                    style={{ color: "#f51167" }}
                  ></i>
                  <span>ADD TO CART</span>
                </Link>
                <Link to="/" className="wishlist-btn">
                  <i className="fas fa-heart" style={{ color: "#f51167" }}></i>
                </Link>
              </div>
            </div>
            <div className="pi-text">
              <h6>$35,00</h6>
              <p>Flamboyant Pink Top </p>
            </div>
          </div>
          <div className="product-item">
            <div className="pi-pic">
              <div className="tag-new">New</div>

              <img
                src="images/fas9.jpg"
                alt="sdsd"
                style={{ display: "none", visibility: "hidden" }}
              />
              <noscript>
                <img src="images/4.jpg" alt="sdsd" />
              </noscript>
              <div className="pi-links">
                <Link to="/" className="add-card">
                  <i
                    className="fa fa-shopping-cart"
                    style={{ color: "#f51167" }}
                  ></i>
                  <span>ADD TO CART</span>
                </Link>
                <Link to="/" className="wishlist-btn">
                  <i className="fas fa-heart" style={{ color: "#f51167" }}></i>
                </Link>
              </div>
            </div>
            <div className="pi-text">
              <h6>$35,00</h6>
              <p>Flamboyant Pink Top </p>
            </div>
          </div>
          <div className="product-item">
            <div className="pi-pic">
              <img
                src="images/fas20.jpg"
                alt="sdsd"
                style={{ display: "none", visibility: "hidden" }}
              />
              <noscript>
                <img src="images/6.jpg" alt="sdsd" />
              </noscript>
              <div className="pi-links">
                <Link to="/" className="add-card">
                  <i
                    className="fa fa-shopping-cart"
                    style={{ color: "#f51167" }}
                  ></i>
                  <span>ADD TO CART</span>
                </Link>
                <Link to="/" className="wishlist-btn">
                  <i className="fas fa-heart" style={{ color: "#f51167" }}></i>
                </Link>
              </div>
            </div>
            <div className="pi-text">
              <h6>$35,00</h6>
              <p>Flamboyant Pink Top </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayCard;
