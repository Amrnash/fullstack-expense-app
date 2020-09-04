import React from "react";
const Spinner = ({ size }) => {
  return (
    <Spinner animation="border" role="status" size={size}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export { Spinner };
