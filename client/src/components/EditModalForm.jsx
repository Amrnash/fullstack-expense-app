import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { setError, clearError, expenseSaved, closeEditModal } from "../actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
const EditModalForm = ({ show }) => {
  let expenseId = useSelector((state) => state.expense.expenseId);
  const now = moment().format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { amount: 0, created: now, description: "" },
    onSubmit: async (values) => {
      const token = localStorage.getItem("AUTH_TOKEN");
      expenseId = expenseId ? expenseId : "";
      try {
        await axios.put(
          `http://localhost:5000/expense/${expenseId}`,
          {
            amount: values.amount,
            created: values.created,
            description: values.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(expenseSaved());
        formik.resetForm();
        dispatch(clearError());
        dispatch(closeEditModal());
      } catch (e) {
        const error = e.response.data.error;
        console.log(error);
        formik.setSubmitting(false);
        dispatch(setError(error));
      }
    },
    validationSchema: Yup.object({
      amount: Yup.number().min(1).required(),
      created: Yup.date("you must provide a valid date").required(),
      description: Yup.string().min(3),
    }),
  });
  const handleClose = () => {
    dispatch(closeEditModal());
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter Expense Amount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.amount && formik.errors.amount}
                value={formik.values.amount}
              />
              {formik.touched.amount && formik.errors.amount ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.amount}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                id="created"
                name="created"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.created}
                isInvalid={formik.touched.created && formik.errors.created}
              />
              {formik.touched.created && formik.errors.created ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.created}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                id="description"
                name="description"
                type="string"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                isInvalid={
                  formik.touched.description && formik.errors.description
                }
              />
              {formik.touched.description && formik.errors.description ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Edit Expense
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { EditModalForm };
