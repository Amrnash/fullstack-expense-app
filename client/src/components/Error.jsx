import React, { useState } from "react";
import { Alert } from "react-bootstrap";
const Error = ({ message }) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <p className="m-1 text-danger">{message}</p>
      </Alert>
    );
  }
  return null;
};

export { Error };
