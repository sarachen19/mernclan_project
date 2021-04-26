import React, { useState,useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import decode from 'jwt-decode';
import { useHistory } from "react-router-dom";
import apiService from './apiService';
import { API_Types_Enum, apiCallURLS } from "./DataConstants";
import AuthContext from '../contexts/AuthContext';

const Register = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      apiService(apiCallURLS.register,
        {
          name: values.name,
          email: values.email,
          password: values.password
        },
        API_Types_Enum.post,
        (response) => {
          sessionStorage.setItem("token", response.data['token']);
          let decodeduser = decode(response.data.token);
          console.log(decodeduser);
          auth.login();
          setIsLoading(false);
          setError(null);
          history.push('/home');
        },
        (err) => {
          setIsLoading(false);
          setError(err.response.data);
        });
    },
  });


  return (
    <div className="Login">
      {isLoading && <div className="alert alert-info regLabel"><strong>Loading...</strong></div>}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (

            <div className="error-msg">{formik.errors.name}</div>

          ) : null}
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (

            <div className="error-msg">{formik.errors.email}</div>

          ) : null}
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name='password'


            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (

            <div className="error-msg">{formik.errors.password}</div>

          ) : null}
        </Form.Group>
        <Button block size="lg" type="submit">
          Register
        </Button>
      </Form>
      {error && <div className="alert alert-danger regLabel">{error}</div>}
    </div>
  );
}

export default Register;