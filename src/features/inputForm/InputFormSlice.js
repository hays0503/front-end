import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   FirstNameSecondName: "none",
//   Department: "none",
//   PostJob: "none",
//   Telephone: "none",
//   status: "idle",
// };
const initialState = {};

export const InputFormSlice = createSlice({
  name: "InputForm",
  initialState,
  reducers: {
    reducersSetFirstNameSecondName: (state, action) => {
      state.FirstNameSecondName = action.payload;
    },
    reducersSetDepartment: (state, action) => {
      state.Department = action.payload;
    },
    reducersSetPostJob: (state, action) => {
      state.PostJob = action.payload;
    },
    reducersSetTelephone: (state, action) => {
      state.Telephone = action.payload;
    },
  },
});

export const {
  reducersSetFirstNameSecondName,
  reducersSetDepartment,
  reducersSetPostJob,
  reducersSetTelephone,
} = InputFormSlice.actions;

export const stateFirstNameSecondName = (state) =>
  state.InputForm.FirstNameSecondName;

export const stateDepartment = (state) => state.InputForm.Department;

export const statePostJob = (state) => state.InputForm.PostJob;

export const stateTelephone = (state) => state.InputForm.Telephone;

export default InputFormSlice.reducer;
