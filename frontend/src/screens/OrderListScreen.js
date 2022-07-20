import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listAllOrders } from '../actions/orderActions';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Paginate from '../components/Paginate';
import { useLocation } from 'react-router-dom';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageNum = new URLSearchParams(location.search).get('page');
  console.log('LOCATION', location);
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, pages, page } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders(pageNum ? pageNum : 1));
    } else {
      console.log('navigate to login page');
      navigate('/login');
    }
  }, [dispatch, navigate, pageNum]);

  const deleteHandler = (id) => {};

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>ORDER CREATION DATE</th>
              <th>CUSTOMER NAME</th>
              <th>EMAIL</th>
              <th>PRICE</th>
              <th>IS PAID</th>
              <th>IS DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>{order.user.name}</td>
                <td>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <i
                      className="fa-solid fa-check"
                      style={{ color: 'green' }}
                    ></i>
                  ) : (
                    <strong>Not paid</strong>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i
                      className="fa-solid fa-check"
                      style={{ color: 'green' }}
                    ></i>
                  ) : (
                    <strong>Not delivered</strong>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} />
    </>
  );
};

export default OrderListScreen;
