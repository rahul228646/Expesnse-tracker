import React from "react";
import "./home.css";
import Background from "../components/background/Background";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../slice/user";
import Card from "../components/card/Card";
import TransactionItem from "../components/transactionItem/TransactionItem";

const Home = () => {
  const user = useSelector((state) => selectUser(state));
  return (
    <div className="home-root">
      <Background />
      <div className="home-header">
        <Typography className="home-greeting">Good afternoon</Typography>
        <Typography className="home-name">{user?.name}</Typography>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Card />
      </div>
      <div className="transaction-data">
        <Typography className="transaction-data-title">
          Transaction History
        </Typography>
        {user?.transactions.map((transaction) => {
          return <TransactionItem key={transaction?.id} data={transaction} />;
        })}
      </div>
    </div>
  );
};

export default Home;
