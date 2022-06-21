import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? <Link to="/login">SIGN IN</Link> : <h3>SIGN IN</h3>}
      </Nav.Item>
      <Nav.Item>
        {step2 ? <Link to="/shipping">SHIPPING</Link> : <h3>SHIPPING </h3>}
      </Nav.Item>
      <Nav.Item>
        {step3 ? <Link to="/payment">PAYMENT</Link> : <>PAYMENT</>}
      </Nav.Item>
      <Nav.Item>
        {step4 ? <Link to="/placeorder">PLACE ORDER</Link> : <>PLACE ORDER</>}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
