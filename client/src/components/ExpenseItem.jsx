import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseDeleted, showEditModal, expenseId } from "../actions";
import moment from "moment";
const ExpenseItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    axios
      .delete(`http://localhost:5000/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(expenseDeleted()))
      .catch((e) => console.log(e.response));
  };
  const handleShowModal = (id) => {
    dispatch(expenseId(id));
    dispatch(showEditModal());
  };
  return (
    <>
      <ListGroup.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span style={{ marginRight: 5 }}>
              {item.description ? item.description : "Expense Item"}
            </span>
            <Badge variant="secondary">{item.amount}</Badge>
            <div className="text-muted">
              {moment(item.created).format("LL")}
            </div>
          </div>
          <div>
            <button
              className="btn btn-danger btn-sm mr-2"
              onClick={() => handleDelete(item._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleShowModal(item._id)}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export { ExpenseItem };
