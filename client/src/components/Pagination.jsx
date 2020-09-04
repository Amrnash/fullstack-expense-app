import React from "react";
import { Pagination } from "react-bootstrap";

const PagintationComponent = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: 20 }}>
      <Pagination>
        {pageNumbers.map((number) => (
          <Pagination.Item
            onClick={() => paginate(number)}
            active={number === currentPage}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};
export { PagintationComponent };
