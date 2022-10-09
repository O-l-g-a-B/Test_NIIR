import React, { useRef, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  authLogin,
} from "../../../../features/auth/authSlice";

const Login = () => {
  const login = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const isLogged = useSelector((state) => state.auth.isLogged);
  const authErrorMessage = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      navigate("/profile");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin({login: login.current.value, password: password.current.value}))
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Control
            type="text"
            name="login"
            placeholder="Login"
            ref={login}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            ref={password}
            required
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant="light" type="submit">
          Submit
        </Button>
        {authErrorMessage && (
          <Alert variant="danger" className="mt-5 fs-6">
            <span>{authErrorMessage}</span>
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Login;
