import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { Error } from "../components";
import {
  setError,
  loggedIn,
  userFetched,
  authAttempting,
  authFailed,
  clearError,
} from "../actions";
//
let schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(3).max(9),
});
let emailValidation = yup.string().required().email();
let passwordValidation = yup.string().required().min(3).max(9);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.error.message);
  const attempting = useSelector((state) => state.auth.attempting);
  const history = useHistory();
  const handleInputChange = (e) => {
    switch (e.target.getAttribute("id")) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password)
      return setLoginErrors({
        email: "Email is required",
        password: "Password is required",
      });
    schema.validate({ email, password }).catch((e) => {
      if (e.path === "email")
        return setLoginErrors({ ...loginErrors, email: e.message });
      else {
        return setLoginErrors({ ...loginErrors, password: e.message });
      }
    });
    dispatch(authAttempting());
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        dispatch(loggedIn());
        history.replace("/");
        return res.data.token;
      })
      .then((token) =>
        axios
          .get("http://localhost:5000/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data.user);
            dispatch(userFetched(res.data.user));
          })
      )
      .catch((e) => {
        dispatch(setError(e.response.data.error));
        dispatch(authFailed());
      });
  };
  const handleInputBlur = (e) => {
    switch (e.target.getAttribute("id")) {
      case "email":
        emailValidation.validate(email).catch((e) => {
          setLoginErrors({ ...loginErrors, email: e.message });
        });
        break;
      case "password":
        passwordValidation
          .validate(password)
          .catch((e) =>
            setLoginErrors({ ...loginErrors, password: e.message })
          );
        break;
      default:
        break;
    }
  };
  return (
    <Container style={{ maxWidth: 700, marginTop: 50 }}>
      {errorMsg && <Error message={errorMsg} />}
      <h2>Login</h2>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            onChange={handleInputChange}
            value={email}
            onBlur={handleInputBlur}
            isInvalid={!!loginErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {loginErrors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={password}
            isInvalid={!!loginErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {loginErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          {attempting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export { Login };
