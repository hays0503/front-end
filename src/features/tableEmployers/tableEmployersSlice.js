import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Employers: [],
};

export const EmployersFormSlice = createSlice({
  name: "EmployersForm",
  initialState,
  reducers: {
    reducersAddEmployers: (state, action) => {
      state.Employers.push(action.payload);
    },
    clearListEmployers: (state) => {
      state.Employers = [];
    },
  },
});

export const { reducersAddEmployers, clearListEmployers } =
  EmployersFormSlice.actions;

export const stateEmployers = (state) => state.EmployersForm.Employers;

export default EmployersFormSlice.reducer;
