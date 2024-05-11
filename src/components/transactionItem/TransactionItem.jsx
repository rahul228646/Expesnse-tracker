import React from "react";
import "./transactionItem.css";
import { Typography } from "@mui/material";
import moment from "moment";

const TransactionItem = ({ data }) => {

  const { name, transactionStatus, currencySymbole, amount, date } = data;

  return (
    <div className="item-root">
      <div className="title">
        <Typography className="item-title">{name}</Typography>
        <Typography>{moment(date).format("MMMM Do YYYY")}</Typography>
      </div>
      <div
        className="amount"
        style={{ color: transactionStatus === "paid" ? "red" : "green" }}
      >
        {" "}
        <Typography className="anmount-typo">
          <span>{transactionStatus === "paid" ? "-" : "+"} </span>
          <span>{currencySymbole} </span>
          {amount}
        </Typography>
      </div>
    </div>
  );
};

export default TransactionItem;
