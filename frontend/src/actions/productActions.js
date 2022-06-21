import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
} from '../constants/productConstants';
import axios from 'axios';

//this is where redux thunk comes in ...
//basically allows to add function inside function
//after arrow add async paranthesis() and add another arrow
//And pass dispatch inside paranthesis and this is how we dispatch
// ...the actions like PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS and so on ...
export const listProducts = () => async (dispatch) => {
  try {
    console.log('entered products ...');
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products/');
    //if anything fails redirects to catch

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); //this payload is very very common for all our requests
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    //if anything fails redirects to catch

    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); //this payload is very very common for all our requests
  }
};

export const reviewProduct = (id, review) => async (dispatch, getState) => {
  console.log('getState', getState);
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: REVIEW_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/products/${id}/reviews`,
      review,
      config
    );
    //if anything fails redirects to catch

    dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); //this payload is very very common for all our requests
  }
};

export const productSearch = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });
    const { data } = await axios.get(`/api/products/search/${keyword}`);
    //if anything fails redirects to catch

    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); //this payload is very very common for all our requests
  }
};
