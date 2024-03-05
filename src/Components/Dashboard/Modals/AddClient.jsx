import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import "./Modal.css";
import SuccessAnimation from "../CommonComponents/SuccessAnimation";
import ToastMessage from "../CommonComponents/ToastMessage";

const AddClient = ({ show, onHide }) => {
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://159.203.84.231:5000/add_client",
        {
          clientId: values?.clientid,
          name: values?.name,
          password: values?.password,
          cid: values.cid,
          sec: values?.sec,
          tradeable: Boolean(values?.tradeable),
          live: Boolean(values?.accountType),
          maxLoss: values?.maxloss,
        }
      );
      console.log(response?.data);
      setSuccess("Client added successfully");
      setTimeout(() => {
        setSuccess(null);
        onHide();
      }, 3000);
    } catch (error) {
      console.error("Error adding client:", error);
      if (error.response.status === 400) {
        ToastMessage({ message: "Client already exists.", type: "error" });
      }
    }
    console.log(values, "Values");
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="clash-text">Add Client</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {success ? (
            <>
              <SuccessAnimation />
              <p className="clash-text d-flex justify-content-center">
                {success}
              </p>
            </>
          ) : (
            <Formik
              initialValues={{
                clientid: "",
                name: "",
                password: "",
                cid: "",
                sec: "",
                tradeable: "",
                accountType: "",
                maxloss: "",
              }}
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors = {};
                if (!values?.clientid) {
                  errors.clientid = "Client Id is required";
                }
                if (!values?.name) {
                  errors.name = "Name is required";
                }
                if (!values?.password) {
                  errors.name = "Password is required";
                }
                if (!values?.cid) {
                  errors.name = "Cid is required";
                }
                if (!values?.sec) {
                  errors.name = "Sec is required";
                }
                if (!values?.tradeable) {
                  errors.name = "Tradeable is required";
                }
                if (!values?.accountType) {
                  errors.name = "AccountType is required";
                }
                if (!values?.maxloss) {
                  errors.name = "maxloss is required";
                }
                return errors;
              }}
            >
              {({ values, handleChange, handleSubmit, isValid }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="clientid">
                    <Form.Label>Client Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="clientid"
                      value={values?.clientid}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values?.name}
                          onChange={handleChange}
                          className="custom-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values?.password}
                          onChange={handleChange}
                          className="custom-input"
                          // required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="cid">
                    <Form.Label>Cid</Form.Label>
                    <Form.Control
                      type="number"
                      name="cid"
                      value={values.cid}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="sec">
                    <Form.Label>Sec</Form.Label>
                    <Form.Control
                      type="text"
                      name="sec"
                      value={values?.sec}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="maxloss">
                    <Form.Label>Max Loss</Form.Label>
                    <Form.Control
                      type="number"
                      name="maxloss"
                      value={values?.maxloss}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="tradeable">
                        <Form.Label>Tradeable</Form.Label>
                        <Form.Control
                          as="select"
                          name="tradeable"
                          value={values?.tradeable}
                          onChange={handleChange}
                          className="custom-input"
                          required
                        >
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="accountType">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control
                          as="select"
                          name="accountType"
                          value={values?.accountType}
                          onChange={handleChange}
                          className="custom-input"
                          required
                        >
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between">
                    <Button className="py-2 cancle-button" onClick={onHide}>
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      type="submit"
                      className="px-4 py-2"
                      disabled={!isValid}
                    >
                      Add User
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>
      <ToastMessage />
    </>
  );
};

export default AddClient;
