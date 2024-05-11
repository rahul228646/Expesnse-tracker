import React, { useEffect, useState } from "react";
import Background from "../components/background/Background";
import "./updateExpense.css";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTransaction } from "../slice/user";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { v4 as uuidv4 } from "uuid";

const Add = () => {
  const [transactionItem, setTransactionItem] = useState({
    currencySymbole: "$",
    currencyCode: "dollar",
  });

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTransactionItem((prev) => ({
      ...prev,
      date: date,
    }));
  }, [date]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setTransactionItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let item = transactionItem;
    item = {
      ...item,
      id: uuidv4(),
    };
    dispatch(addTransaction(transactionItem));
    navigate("/");
  };

  return (
    <div className="update-root">
      <Background />
      <div className="update-expense-header">
        <KeyboardArrowLeftIcon
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        <div style={{ width: "100%" }}>
          <Typography
            style={{
              fontWeight: "bold",
            }}
          >
            Add Expense
          </Typography>
        </div>
      </div>
      <form className="form-root" onSubmit={handleSubmit}>
        <div className="form-item">
          <label style={{ color: "white" }}>Name</label>

          <Select
            style={{ color: "white" }}
            name="name"
            onChange={handleChange}
          >
            <MenuItem value={"Netflix"}>Netflix</MenuItem>
            <MenuItem value={"Upwork"}>Upwork</MenuItem>
            <MenuItem value={"Youtube"}>Youtube</MenuItem>
          </Select>
        </div>
        <div className="form-item">
          <label>Amount</label>

          <TextField
            type="number"
            variant="outlined"
            onChange={handleChange}
            name="amount"
          />
        </div>

        <div className="form-item">
          <label>Date</label>
          <DatePicker
            selected={date}
            onChange={(newVal) => setDate(newVal)}
            className="datePicker"
          />
        </div>

        <div className="form-item">
          <label>Transaction Status</label>

          <Select name="transactionStatus" onChange={handleChange}>
            <MenuItem value={"paid"}>Paid</MenuItem>
            <MenuItem value={"received"}>Received</MenuItem>
          </Select>
        </div>

        <Button
          type="submit"
          style={{ height: "54px", marginTop: "24px" }}
          variant="contained"
          disabled={
            !transactionItem?.name ||
            !transactionItem?.transactionStatus ||
            !transactionItem?.amount
          }
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default Add;
