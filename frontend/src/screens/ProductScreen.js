import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { reviewProduct } from '../actions/productActions';
const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //QTY STATE
  const [qty, setQty] = useState(1);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReview = useSelector((state) => state.productReview);
  const {
    loading: reviewLoad,
    success: reviewSuccess,
    error: reviewError,
  } = productReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, error: userError, userInfo } = userLogin;

  useEffect(() => {
    if (reviewSuccess) {
      alert('Review Submitted Successfully');
      setRating('0');
      setComment('');
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id, reviewSuccess]);

  //Add to cart

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  //REVIEW SUBMIT
  const submitHandler = (e) => {
    e.preventDefault();
    const review = {
      rating,
      comment,
    };
    dispatch(reviewProduct(params.id, review));
  };

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
            {product.reviews.length === 0 && (
              <Message variant="success">NO RATINGS FOR THE PRODUCT</Message>
            )}
            {product.reviews.map((review) => (
              <ListGroup variant="flush">
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color="yellow" />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              </ListGroup>
            ))}
            {reviewError && <Message variant="danger">{reviewError}</Message>}
            {userInfo ? (
              <Form onSubmit={submitHandler}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <p>Add Review</p>
                    <Form.Select
                      aria-label="Default select example"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="0">Select ...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Not good</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Select>
                    <br />
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Add Comments</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Form>
            ) : (
              <>
                <Message>
                  Please <Link to="/login">Sign In</Link> to review the product
                </Message>
              </>
            )}
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="yellow"
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                          ,
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <Button
                  className="btn btn-dark"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
