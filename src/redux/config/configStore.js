import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "../slices/DataSlice";

const store = configureStore({
  reducer: {
    data: DataSlice,
  },
});

export default store;
