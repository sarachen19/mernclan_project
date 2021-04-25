import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import apiService from './apiService';
import { API_Types_Enum, apiCallURLS } from "./DataConstants";
import { useHistory } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = useContext(AuthContext);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    apiService(apiCallURLS.authentication,
      {
        email: email,
        password: password
      },
      API_Types_Enum.post,
      (response) => {
        sessionStorage.setItem("token", response.data['token']);
        auth.login();
        history.push('/cars');
      },
      (err) => console.log(err));
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;