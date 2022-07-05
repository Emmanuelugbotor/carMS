import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "../App.css";
import Card from "./Cards";
import { getProducts } from "../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Premium from "./Premium";
import url from "../constant/url";

const CardView = (props) => {
  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.getProduct);
  const [feature, setFeatured] = useState([]);
  const [category, setCategory] = useState([]);
  const { products, loading, error } = getProduct;

  const categoryHandler = (cate) => {
    let newProduct;
    cate == "ALL"
      ? setFeatured(products)
      : setFeatured(
          products.filter((category) => {
            return category.secondCategory == cate;
          })
        );
  };

  useEffect(() => {
    axios
      .get(`${url}getproducts`)
      .then((res) => {
        // console.log(res);
        setFeatured(res.data.items);
        setCategory(res.data.items);
      })
      .catch((error) => console.log(error), setFeatured([]));
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <section
        class="latest__product all__product"
        style={{ backgroundColor: "white" }}
      >
        <h2 class="title">Our Products </h2>
        <div class="featured__product-body">
          <div class="ecomm__container">
            {loading ? (
              <h1>LOADING....</h1>
            ) : error ? (
              <h1>No Product Found</h1>
            ) : feature ? (
              feature.map((prod, id) => {
                return <Card key={prod.id} {...prod} />;
              })
            ) : (
              <h2>No product found</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CardView;
