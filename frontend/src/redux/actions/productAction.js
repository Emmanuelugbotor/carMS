import React from "react";
import * as actionTypes from "../constants/productConstant";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import url from "../../constant/url";

const getProductQuery = gql`
  {
    AllProducts {
      id
      name
      price
      image
    }
  }
`;

export const getProducts = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRODUCT_REQUEST,
  });
  try {
    axios
      .get(`${url}getProducts`)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_PRODUCT_SUCCESS,
          payload: res.data.items,
        });
        localStorage.setItem("products", JSON.stringify(res.data.items));

      })
      .catch((error) =>
        dispatch({
          type: actionTypes.GET_PRODUCT_FAIL,
          payload: error,
        })
      );
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_FAIL,
      payload: null,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
  });
  try {
    axios
      .get(`${url}getProduct/${id}`)
      .then((res) => dispatch({
          type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
          payload: res.data.items,
        })
      )
      .catch((error) =>
        dispatch({
          type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
          payload: error,
        })
      );
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload: error,
    });
  }
};
