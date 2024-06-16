import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndex: "",
  data: JSON.parse(localStorage.getItem("localData")) || [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("localData", JSON.stringify(action.payload));
    },
  },
});

export const { setActiveIndex, setData } = dataSlice.actions;
export default dataSlice.reducer;
