import React from "react";
import "./transactionItem.css";
import { Typography } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const TransactionItem = ({ data, selected }) => {
  const { name, transactionStatus, currencySymbole, amount, date } = data;
  const navigate = useNavigate();

  return (
    <div className={`item-root`}>
      <div className="title">
        <Typography className="item-title">{name}</Typography>
        <Typography>{moment(date).format("MMMM Do YYYY")}</Typography>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div
          className="amount"
          style={{
            color: selected
              ? "white"
              : transactionStatus === "paid"
              ? "red"
              : "green",
          }}
        >
          {" "}
          <Typography className="anmount-typo">
            <span>{transactionStatus === "paid" ? "-" : "+"} </span>
            <span>{currencySymbole} </span>
            {amount}
          </Typography>
        </div>
        <EditIcon
          style={{ color: selected ? "white" : "" }}
          onClick={() =>
            navigate("/edit", {
              state: data,
            })
          }
        />
      </div>
    </div>
  );
};

export default TransactionItem;
