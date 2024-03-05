import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import "./Modal.css";
import axios from "axios";
import SuccessAnimation from "../CommonComponents/SuccessAnimation";

const AddStrategy = ({ show, onHide }) => {
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://159.203.84.231:5000/add_strategy", {
        strategy: values?.strategy,
        symbol: values?.symbol,
        orderType: values?.ordertype,
        direction: values.direction,
        inverse: Boolean(values?.inverse),
        pyramid: Boolean(values?.pyramid),
      });
      console.log(response?.data);
      setSuccess("Strategy successfully added");
      setTimeout(() => {
        setSuccess(null);
        onHide();
      }, 3000);
    } catch (error) {
      console.error("Error adding client:", error);
    }
    console.log(values, "Values");
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="clash-text">Add Strategy</Modal.Title>
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
                strategy: "",
                symbol: "",
                ordertype: "",
                direction: "",
                inverse: "",
                pyramid: "",
              }}
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors = {};
                if (!values?.strategy) {
                  errors.fullName = "Strategy Id is required";
                }
                if (!values?.symbol) {
                  errors.name = "symbol is required";
                }
                return errors;
              }}
            >
              {({ values, handleChange, handleSubmit, isValid }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="strategy">
                    <Form.Label>Strategy</Form.Label>
                    <Form.Control
                      type="text"
                      name="strategy"
                      value={values?.strategy}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="symbol">
                    <Form.Label>Symbol</Form.Label>
                    <Form.Control
                      type="text"
                      name="symbol"
                      value={values?.symbol}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="ordertype">
                    <Form.Label>Order Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="ordertype"
                      value={values?.ordertype}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="direction">
                    <Form.Label>Direction</Form.Label>
                    <div className="d-flex justify-content-between">
                      <Form.Check
                        type="radio"
                        label="long short"
                        name="direction"
                        id="long_short"
                        value="long_short"
                        checked={values.direction === "long_short"}
                        onChange={handleChange}
                        className="custom-radio"
                      />
                      <Form.Check
                        type="radio"
                        label="Long Only"
                        name="direction"
                        id="long_only"
                        value="long_only"
                        checked={values.direction === "long_only"}
                        onChange={handleChange}
                        className="custom-radio"
                      />
                      <Form.Check
                        type="radio"
                        label="Short Only"
                        name="direction"
                        id="short_only"
                        value="short_only"
                        checked={values.direction === "short_only"}
                        onChange={handleChange}
                        className="custom-radio"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="inverse">
                    <Form.Label>Inverse</Form.Label>
                    <Form.Control
                      as="select"
                      name="inverse"
                      value={values?.inverse}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="pyramid">
                    <Form.Label>Pyramid</Form.Label>
                    <Form.Control
                      as="select"
                      name="pyramid"
                      value={values?.pyramid}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </Form.Control>
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

export default AddStrategy;
