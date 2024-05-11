import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "rahul",
  balance: 1000,
  totalIncome: 0,
  totalExpense: 0,
  transactions: [],
  expenses: [],
  income: [],
  currencySymbol: "$",
  currencyCode: "dollar",
};

export const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { transactionStatus, amount } = action.payload;
      if (transactionStatus === "paid") {
        let expenses = [...state.expenses, action.payload];
        state.expenses = expenses;
        state.balance = parseFloat(state.balance) - parseFloat(amount);
        state.totalExpense =
          parseFloat(state.totalExpense) + parseFloat(amount);
      } else {
        let income = [...state.income, action.payload];
        state.income = income;
        state.balance = parseFloat(state.balance) + parseFloat(amount);
        state.totalIncome = parseFloat(state.totalIncome) + parseFloat(amount);
      }
      let trsansaction = [...state.transactions, action.payload];
      trsansaction.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      state.transactions = trsansaction;
    },
  },
});

export const { addTransaction } = userInfoSlice.actions;

export const selectUser = (state) => state.userInfo;

export default userInfoSlice.reducer;
