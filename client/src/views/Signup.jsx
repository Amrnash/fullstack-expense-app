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
  userFetched,
  loggedIn,
  authAttempting,
  authFailed,
  clearError,
} from "../actions";
//
let schema = yup.object().shape({
  name: yup.string().min(3).max(10),
  email: yup.string().required().email(),
  password: yup.string().required().min(3).max(9),
});
let nameValidation = yup.string().min(3).max(10);
let emailValidation = yup.string().required().email();
let passwordValidation = yup.string().required().min(3).max(9);
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.error.message);
  const attempting = useSelector((state) => state.auth.attempting);
  const [signupErrors, setSignupErrors] = useState({ email: "", password: "" });
  const history = useHistory();
  const handleInputChange = (e) => {
    switch (e.target.getAttribute("id")) {
      case "name":
        setName(e.target.value);
        break;
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
      return setSignupErrors({
        email: "Email is required",
        password: "Password is required",
      });
    schema.validate({ email, password }).catch((e) => {
      if (e.path === "email")
        return setSignupErrors({ ...signupErrors, email: e.message });
      else {
        return setSignupErrors({ ...signupErrors, password: e.message });
      }
    });
    let reqBody = name ? { name, email, password } : { email, password };
    dispatch(authAttempting());
    axios
      .post("http://localhost:5000/signup", reqBody)
      .then((res) => {
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        dispatch(loggedIn());
        history.replace("/");
        return res.data.token;
      })
      .then((token) => {
        axios
          .get("http://localhost:5000/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data.user);
            dispatch(userFetched(res.data.user));
          });
      })
      .catch((e) => {
        dispatch(setError(e.response.data.error));
        dispatch(authFailed());
      });
  };
  const handleInputBlur = (e) => {
    switch (e.target.getAttribute("id")) {
      case "name":
        if (e.target.value === "") break;
        nameValidation
          .validate(name)
          .catch((e) =>
            setSignupErrors({ ...setSignupErrors, name: e.message })
          );
        break;
      case "email":
        emailValidation
          .validate(email)
          .catch((e) => setSignupErrors({ ...signupErrors, email: e.message }));
        break;
      case "password":
        passwordValidation
          .validate(password)
          .catch((e) =>
            setSignupErrors({ ...signupErrors, password: e.message })
          );
        break;
      default:
        break;
    }
  };
  return (
    <Container style={{ maxWidth: 700, marginTop: 50 }}>
      {errorMsg && <Error message={errorMsg} />}
      <h2>Sign Up</h2>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            id="name"
            onChange={handleInputChange}
            value={name}
            onBlur={handleInputBlur}
            isInvalid={!!signupErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {signupErrors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            id="email"
            onChange={handleInputChange}
            value={email}
            onBlur={handleInputBlur}
            isInvalid={!!signupErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {signupErrors.email}
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
            isInvalid={!!signupErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {signupErrors.password}
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

export { Signup };
