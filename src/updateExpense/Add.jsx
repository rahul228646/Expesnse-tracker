import React, { useEffect, useState } from "react";
import Background from "../components/background/Background";
import "./updateExpense.css";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTransaction, updateTransaction } from "../slice/user";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { v4 as uuidv4 } from "uuid";

const Add = ({ title, buttonText }) => {
  const [transactionItem, setTransactionItem] = useState();

  const location = useLocation();
  if (location?.state && !transactionItem) {
    setTransactionItem(location?.state);
  }

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
    if (buttonText == "Update") {
      dispatch(updateTransaction(transactionItem));
    } else {
      let item = transactionItem;
      item = {
        ...item,
        id: uuidv4(),
        currencySymbole: "$",
        currencyCode: "dollar",
      };
      dispatch(addTransaction(item));
    }
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
            {title}
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
            value={transactionItem?.name}
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
            value={transactionItem?.amount}
          />
        </div>

        <div className="form-item">
          <label>Date</label>
          <DatePicker
            selected={transactionItem?.date}
            onChange={(newVal) =>
              setTransactionItem((prev) => ({ ...prev, date: newVal }))
            }
            className="datePicker"
          />
        </div>

        <div className="form-item">
          <label>Transaction Status</label>

          <Select
            name="transactionStatus"
            onChange={handleChange}
            value={transactionItem?.transactionStatus}
          >
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
            !transactionItem?.date ||
            !transactionItem?.amount
          }
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default Add;
