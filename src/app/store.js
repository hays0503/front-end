import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import InputFormSlice from "../features/inputForm/InputFormSlice";
import EmployersFormSlice from "../features/tableEmployers/tableEmployersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    InputForm: InputFormSlice,
    EmployersForm: EmployersFormSlice,
  },
});
