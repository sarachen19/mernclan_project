import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';
import decode from 'jwt-decode';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
   
  });
   
  const { name, email, password } = registerData;
  const onChangeValue = (e) =>
  setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleRegister  = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        //'http://localhost:5000/api/user',
        'http://localhost:5000/api/users',
        data,
        config
      );
      localStorage.setItem('token', response.data.token);
     
      let decodeduser = decode(response.data.token);
      console.log('user added successfully');
      console.log(decodeduser);
    } catch (e) {
      console.log('error ', e);
    }
  };
  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0;
  }

 

  return (
    <div className="Login">
      <Form onSubmit={handleRegister}>
      <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name='name'
            value={name}
            onChange={(e) => onChangeValue(e)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name='email'
            value={email}
            onChange={(e) => onChangeValue(e)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name='password'
            value={password}
            minLength='5'
            onChange={(e) => onChangeValue(e)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;