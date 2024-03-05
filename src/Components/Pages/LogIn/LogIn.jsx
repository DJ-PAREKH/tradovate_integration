import React from "react";
import { Formik } from "formik";
import { Container, Button, Form } from "react-bootstrap";
import "./Login.css";
import logo from "../../../Assets/logo.png";
import { useNavigate } from "react-router";

const LogIn = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log("Sign In Form Values:", values);
    navigate("./dashboard");
  };

  return (
    <div className="center-box">
      <Container className="d-flex justify-content-center">
        <div className="p-3 p-md-4 px-0 row signup-box">
          <Formik
            initialValues={{
              Email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors = {};
              if (!values?.Email) {
                errors.Email = "Email is required";
              }
              if (!values?.password) {
                errors.password = "Password is required";
              }
              return errors;
            }}
          >
            {({ values, handleChange, handleSubmit, isValid }) => (
              <Form onSubmit={handleSubmit}>
                <div className="text-center mb-3 mt-3">
                  <img src={logo} alt="logo" className="w-auto" />
                </div>
                <Form.Group controlId="Email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    value={values?.Email}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </Form.Group>

                <Button
                  variant="secondary"
                  type="submit"
                  className="mt-3 px-5 py-2 w-100"
                  disabled={!isValid}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default LogIn;
