import React from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import "./Modal.css";
import axios from "axios";
import SuccessAnimation from "../CommonComponents/SuccessAnimation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const AddConfigration = ({ show, onHide }) => {
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://159.203.84.231:5000/add_strategy_config",
        {
          clientId: values?.client,
          strategy: values?.strategy,
          stopLoss: parseFloat(values?.stoploss),
          trailing: Boolean(values.tredingstoploss),
          take_profit: parseFloat(values?.takeprofit),
          orderQty: values?.orderqualityfix,
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
      if (error?.response?.status === 404) {
        toast?.error("Client not found.");
      }
    }
    console.log(values, "Values");
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="clash-text">
            Add Strategy Configuration
          </Modal.Title>
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
                client: "",
                strategy: "",
                stoploss: "",
                tredingstoploss: "",
                takeprofit: "",
                orderqualityfix: "",
              }}
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors = {};
                if (!values?.client) {
                  errors.fullName = "Client Id is required";
                }
                if (!values?.strategy) {
                  errors.name = "Name is required";
                }
                return errors;
              }}
            >
              {({ values, handleChange, handleSubmit, isValid }) => (
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="client">
                        <Form.Label>Client</Form.Label>
                        <Form.Control
                          type="text"
                          name="client"
                          value={values?.client}
                          onChange={handleChange}
                          className="custom-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="strategy">
                        <Form.Label>Strategy</Form.Label>
                        <Form.Control
                          type="text"
                          name="strategy"
                          value={values?.strategy}
                          onChange={handleChange}
                          className="custom-input"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="stoploss">
                        <Form.Label>Stop loss %</Form.Label>
                        <Form.Control
                          type="number"
                          name="stoploss"
                          value={values?.stoploss}
                          onChange={handleChange}
                          className="custom-input"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="tredingstoploss">
                        <Form.Label>Trading Stop loss</Form.Label>
                        <Form.Control
                          as="select"
                          name="tredingstoploss"
                          value={values?.tredingstoploss}
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
                  <Form.Group controlId="takeprofit">
                    <Form.Label>Take Profit %</Form.Label>
                    <Form.Control
                      type="text"
                      name="takeprofit"
                      value={values?.takeprofit}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="orderqualityfix">
                    <Form.Label>Order Quantity Fix</Form.Label>
                    <Form.Control
                      type="text"
                      name="orderqualityfix"
                      value={values?.orderqualityfix}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <div className="d-flex justify-content-between mt-3">
                    <Button className="py-2 cancle-button" onClick={onHide}>
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      type="submit"
                      className="px-4 py-2"
                      disabled={!isValid}
                    >
                      Add
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddConfigration;
