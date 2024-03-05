import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import "./Modal.css";

const AddSymbol = ({ show, onHide }) => {
  const handleSubmit = async (values) => {
    console.log(values, "values");
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="clash-text">Add symbol</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              symbolname: "",
              epic: "",
            }}
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors = {};
              if (!values?.symbolname) {
                errors.fullName = "Symbol Name is required";
              }
              if (!values?.name) {
                errors.epic = "Epic is required";
              }
              return errors;
            }}
          >
            {({ values, handleChange, handleSubmit, isValid }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="symbolname">
                  <Form.Label>Symbol Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="symbolname"
                    value={values?.symbolname}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="epic">
                  <Form.Label>Epic</Form.Label>
                  <Form.Control
                    type="text"
                    name="epic"
                    value={values?.epic}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddSymbol;
