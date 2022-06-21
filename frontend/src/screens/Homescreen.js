import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, productSearch } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  PRODUCT_LIST_RESET,
  PRODUCT_SEARCH_RESET,
} from '../constants/productConstants';
const Homescreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  if (keyword) {
    console.log(keyword);
  }
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productSearchList = useSelector((state) => state.productSearch);
  console.log('productSearchList', productSearchList);
  const {
    searchedProducts,
    loading: productSearchLoading,
    error: productLoadingError,
  } = productSearchList;

  if (searchedProducts) {
    console.log('searchedProducts', searchedProducts);
  }

  useEffect(() => {
    if (keyword) {
      console.log('calling product search dispatch action');

      dispatch({ type: PRODUCT_LIST_RESET });
      dispatch(productSearch(keyword));
    } else {
      dispatch(listProducts());
      dispatch({ type: PRODUCT_SEARCH_RESET });
    }
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          {productSearchLoading && <Loader />}
          {productLoadingError && (
            <Message variant="danger">{productLoadingError}</Message>
          )}
          {searchedProducts &&
            searchedProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default Homescreen;
