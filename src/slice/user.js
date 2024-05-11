import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "rahul",
  balance: 1000,
  totalIncome: 0,
  totalExpense: 0,
  transactions: [],
  income: [],
  expenses: [],
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
      let transaction = [...state.transactions, action.payload];
      transaction.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      state.transactions = transaction;
    },

    updateTransaction: (state, action) => {
      const { id, transactionStatus, amount } = action.payload;
      let transactionIdx = null;
      transactionIdx = state.transactions.findIndex(
        (trans) => trans?.id === id
      );
      let oldExpense = state.expenses;
      let oldIncome = state.income;

      let oldTransaction = state.transactions[transactionIdx];

      if (oldTransaction?.transactionStatus === "paid") {
        if (transactionStatus === "paid") {
          state.balance =
            parseFloat(state.balance) +
            parseFloat(oldTransaction?.amount) -
            parseFloat(amount);
          state.totalExpense =
            parseFloat(state.totalExpense) -
            parseFloat(oldTransaction?.amount) +
            parseFloat(amount);
        } else {
          oldExpense = oldExpense?.filter((expense) => expense?.id != id);
          state.expenses = oldExpense;
          state.income = [...state?.income, action.payload];
          state.balance =
            parseFloat(state.balance) +
            parseFloat(oldTransaction?.amount) +
            parseFloat(amount);
          state.totalExpense =
            parseFloat(state.totalExpense) - parseFloat(oldTransaction?.amount);
          state.totalIncome =
            parseFloat(state.totalIncome) + parseFloat(amount);
        }
      } else {
        if (transactionStatus === "paid") {
          oldIncome = oldIncome?.filter((income) => income?.id != id);
          state.income = oldIncome;
          state.expenses = [...state?.expenses, action.payload];
          state.balance =
            parseFloat(state.balance) -
            parseFloat(oldTransaction?.amount) -
            parseFloat(amount);
          state.totalExpense =
            parseFloat(state.totalExpense) + parseFloat(amount);
          state.totalIncome =
            parseFloat(state.totalIncome) - parseFloat(oldTransaction?.amount);
        } else {
          state.balance =
            parseFloat(state.balance) -
            parseFloat(oldTransaction?.amount) +
            parseFloat(amount);
          state.totalIncome =
            parseFloat(state.totalIncome) -
            parseFloat(oldTransaction?.amount) +
            parseFloat(amount);
        }
      }

      let allTransactions = state.transactions;
      allTransactions[transactionIdx] = action.payload;
      allTransactions?.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      state.transactions = allTransactions;
    },
  },
});

export const { addTransaction, updateTransaction } = userInfoSlice.actions;

export const selectUser = (state) => state.userInfo;

export default userInfoSlice.reducer;
