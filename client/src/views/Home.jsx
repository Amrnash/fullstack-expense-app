import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Container, Spinner } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import {
  expensesFetching,
  expensesFetchSuccess,
  expensesFetchFailed,
  resetExpenseSaved,
  resetExpenseDeleted,
} from "../actions";
import {
  ModalForm,
  ExpenseItem,
  EditModalForm,
  MonthSelector,
  PagintationComponent,
} from "../components";
const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const fetching = useSelector((state) => state.expense.fetching);
  const expenses = useSelector((state) => state.expense.expenses);
  const isSaved = useSelector((state) => state.expense.saved);
  const isDeleted = useSelector((state) => state.expense.deleted);
  const showModal = useSelector((state) => state.expense.showEditModal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(expensesFetching());
    const token = localStorage.getItem("AUTH_TOKEN");
    axios
      .get(`http://localhost:5000/expense/${selectedMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(expensesFetchSuccess(res.data.expenses));
      })
      .catch((error) => dispatch(expensesFetchFailed()));
  }, [selectedMonth]);
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    axios
      .get(`http://localhost:5000/expense/${selectedMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(expensesFetchSuccess(res.data.expenses));
        dispatch(resetExpenseSaved());
      })
      .catch((error) => dispatch(expensesFetchFailed()));
  }, [isSaved]);
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    axios
      .get(`http://localhost:5000/expense/${selectedMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(expensesFetchSuccess(res.data.expenses));
        dispatch(resetExpenseDeleted());
      })
      .catch((error) => dispatch(expensesFetchFailed()));
  }, [isDeleted]);
  // get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);
  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (fetching)
    return (
      <Container>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 200 }}
        >
          <Spinner
            animation="border"
            role="status"
            size="lg"
            style={{ height: 100, width: 100 }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  return (
    <div style={{ marginTop: 30 }}>
      <Container>
        <h3>Expenses List</h3>
        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <hr />
        {expenses.length == 0 && (
          <h3 className="text-secondary">No Expenses Added For This Month</h3>
        )}
        <ListGroup>
          {currentItems.map((item) => {
            return <ExpenseItem item={item} key={item._id}></ExpenseItem>;
          })}
        </ListGroup>
        <PagintationComponent
          itemsPerPage={itemsPerPage}
          totalItems={expenses.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
      <ModalForm />
      <EditModalForm show={showModal} />
    </div>
  );
};

export { Home };
