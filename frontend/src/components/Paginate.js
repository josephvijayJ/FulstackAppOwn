import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page }) => {
  console.log(pages, page);
  const items = [];
  let active = page;
  for (let number = 1; number <= pages; number++) {
    items.push(
      <LinkContainer to={`/admin/orderlist?page=${number}`}>
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      </LinkContainer>
    );
  }
  return (
    <>
      <Pagination>{items}</Pagination>
    </>
  );
};

export default Paginate;
