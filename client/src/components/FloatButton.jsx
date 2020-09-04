import React from "react";
import { Button } from "react-bootstrap";
const FloatButton = ({ handleShow }) => {
  return (
    <div
      style={{ position: "fixed", bottom: 40, right: 40, cursor: "pointer" }}
    >
      <Button
        variant="primary"
        style={{ borderRadius: 500, height: 60, width: 60 }}
        onClick={handleShow}
      >
        <i className="fa fa-plus"></i>
      </Button>
    </div>
  );
};

export { FloatButton };
