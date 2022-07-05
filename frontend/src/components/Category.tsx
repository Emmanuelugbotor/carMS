import React from "react";

// THIS COMPONENT IS NOT IN USE YET, AM YET TO BREAK IT INTO REUSEABLE COMPOENETS
const Category = () => {
  return (
    <section className="category-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 order-2 order-lg-1">
            <div className="filter-widget">
              <h2 className="fw-title">Categories</h2>
              <ul className="category-menu">
                <li>
                  <a href="sdsd">Woman wear</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="sdsd">
                        Midi Dresses <span>(2)</span>
                      </a>
                    </li>
                    <li>
                      <a href="sdsd">
                        Maxi Dresses<span>(56)</span>
                      </a>
                    </li>
                    <li>
                      <a href="sdsd">
                        Prom Dresses<span>(36)</span>
                      </a>
                    </li>
                    <li>
                      <a href="sdsd">
                        Little Black Dresses <span>(27)</span>
                      </a>
                    </li>
                    <li>
                      <a href="sdsd">
                        Mini Dresses<span>(19)</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="sdsd">Man Wear</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="sdsd">
                        Midi Dresses <span>(2)</span>
                      </a>
                    </li>
                    <li>
                      <a href="sdsd">
                        Maxi Dresses<span>(56)</span>
                      </a>
                    </li>
                    <li>
                      <a href="sdsd">
                        Prom Dresses<span>(36)</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="sdsd">Children</a>
                </li>
                <li>
                  <a href="sdsd">Native Wears</a>
                </li>
                <li>
                  <a href="sdsd">English Wears</a>
                </li>
                <li>
                  <a href="sdsd">Ankara</a>
                </li>
              </ul>
            </div>
            <div className="filter-widget mb-0">
              <h2 className="fw-title">refine by</h2>
              <div className="price-range-wrap">
                <h4>Price</h4>
                <div
                  className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                  data-min="10"
                  data-max="270"
                >
                  <div
                    className="ui-slider-range ui-corner-all ui-widget-header"
                    style={{ left: "0%", width: "100%" }}
                  ></div>
                  <span
                    tabIndex={1}
                    className="ui-slider-handle ui-corner-all ui-state-default"
                    style={{ left: "0%" }}
                  ></span>
                  <span
                    tabIndex={1}
                    className="ui-slider-handle ui-corner-all ui-state-default"
                    style={{ left: "100%" }}
                  ></span>
                </div>
                <div className="range-slider">
                  <div className="price-input">
                    <input type="text" id="minamount" />
                    <input type="text" id="maxamount" />
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-widget mb-0">
              <h2 className="fw-title">color by</h2>
              <div className="fw-color-choose">
                <div className="cs-item">
                  <input type="radio" name="cs" id="gray-color" />
                  <label className="cs-gray" htmlFor="gray-color">
                    <span>(3)</span>
                  </label>
                </div>
                <div className="cs-item">
                  <input type="radio" name="cs" id="orange-color" />
                  <label className="cs-orange" htmlFor="orange-color">
                    <span>(25)</span>
                  </label>
                </div>
                <div className="cs-item">
                  <input type="radio" name="cs" id="yollow-color" />
                  <label className="cs-yollow" htmlFor="yollow-color">
                    <span>(112)</span>
                  </label>
                </div>
                <div className="cs-item">
                  <input type="radio" name="cs" id="green-color" />
                  <label className="cs-green" htmlFor="green-color">
                    <span>(75)</span>
                  </label>
                </div>
                <div className="cs-item">
                  <input type="radio" name="cs" id="purple-color" />
                  <label className="cs-purple" htmlFor="purple-color">
                    <span>(9)</span>
                  </label>
                </div>
                <div className="cs-item">
                  <input type="radio" name="cs" id="blue-color" checked />
                  <label className="cs-blue" htmlFor="blue-color">
                    <span>(29)</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="filter-widget mb-0">
              <h2 className="fw-title">Size</h2>
              <div className="fw-size-choose">
                <div className="sc-item">
                  <input type="radio" name="sc" id="xs-size" />
                  <label htmlFor="xs-size">XS</label>
                </div>
                <div className="sc-item">
                  <input type="radio" name="sc" id="s-size" />
                  <label htmlFor="s-size">S</label>
                </div>
                <div className="sc-item">
                  <input type="radio" name="sc" id="m-size" checked />
                  <label htmlFor="m-size">M</label>
                </div>
                <div className="sc-item">
                  <input type="radio" name="sc" id="l-size" />
                  <label htmlFor="l-size">L</label>
                </div>
                <div className="sc-item">
                  <input type="radio" name="sc" id="xl-size" />
                  <label htmlFor="xl-size">XL</label>
                </div>
                <div className="sc-item">
                  <input type="radio" name="sc" id="xxl-size" />
                  <label htmlFor="xxl-size">XXL</label>
                </div>
              </div>
            </div>
            <div className="filter-widget">
              <h2 className="fw-title">Brand</h2>
              <ul className="category-menu">
                <li>
                  <a href="sdsd">
                    Abercrombie & Fitch <span>(2)</span>
                  </a>
                </li>
                <li>
                  <a href="sdsd">
                    Asos<span>(56)</span>
                  </a>
                </li>
                <li>
                  <a href="sdsd">
                    Bershka<span>(36)</span>
                  </a>
                </li>
                <li>
                  <a href="sdsd">
                    Missguided<span>(27)</span>
                  </a>
                </li>
                <li>
                  <a href="sdsd">
                    Zara<span>(19)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <div className="tag-sale">ON SALE</div>
                    <img
                      data-cfsrc="images/fas1.jpg"
                      src="images/fas1.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas1.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Black and White Stripes Dress</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas2.jpg"
                      src="images/fas2.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas2.jpg" />{" "}
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas4.jpg"
                      src="images/fas4.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas4.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas5.jpg"
                      src="images/fas5.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas5.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Black and White Stripes Dress</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas6.jpg"
                      src="images/fas6.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas6.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas7.png"
                      src="images/fas7.png"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas7.png" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas8.jpg"
                      src="images/fas8.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas8.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas9.jpg"
                      src="images/fas9.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas9.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas10.jpg"
                      src="images/fas10.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas10.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <div className="tag-new">new</div>
                    <img
                      data-cfsrc="images/fas11.jpg"
                      src="images/fas11.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas11.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Black and White Stripes Dress</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas12.jpg"
                      src="images/fas12.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas12.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                  <div className="pi-pic">
                    <img
                      data-cfsrc="images/fas13.jpg"
                      src="images/fas13.jpg"
                      alt="ssd"
                      style={{ display: "none", visibility: "hidden" }}
                    />
                    <noscript>
                      <img src="images/fas13.jpg" alt="ssd" />
                    </noscript>
                    <div className="pi-links">
                      <a href="fff" className="add-card">
                        <i
                          className="fa fa-shopping-cart"
                          style={{ color: "#f51167" }}
                        ></i>
                        <span>ADD TO CART</span>
                      </a>
                      <a href="fff" className="wishlist-btn">
                        <i
                          className="fas fa-heart"
                          style={{ color: "#f51167" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>$35,00</h6>
                    <p>Flamboyant Pink Top </p>
                  </div>
                </div>
              </div>
              <div className="text-center w-100 pt-3">
                <button className="site-btn sb-line sb-dark" type="button">
                  LOAD MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
