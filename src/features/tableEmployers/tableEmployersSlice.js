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
  },
});

export const { reducersAddEmployers } = EmployersFormSlice.actions;

export const stateEmployers = (state) => state.EmployersForm.Employers;

export default EmployersFormSlice.reducer;
