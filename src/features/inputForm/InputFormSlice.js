import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  FirstNameSecondName: "none",
  Department: "none",
  PostJob: "none",
  Telephone: "none",
  status: "idle",
};

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
  },
});

export const {
  reducersSetFirstNameSecondName,
  reducersSetDepartment,
  reducersSetPostJob,
} = InputFormSlice.actions;

export const stateFirstNameSecondName = (state) =>
  state.InputForm.FirstNameSecondName;

export const stateDepartment = (state) => state.InputForm.Department;

export const statePostJob = (state) => state.InputForm.PostJob;

export default InputFormSlice.reducer;
