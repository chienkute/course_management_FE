import { createSlice } from "@reduxjs/toolkit";
export const completedSlice = createSlice({
  name: "video",
  initialState: {
    compeleted: [],
  },
  reducers: {
    completedVideos: (state, action) => {
      state.compeleted = [...state.compeleted, action.payload];
    },
  },
});
export const { completedVideos } = completedSlice.actions;
export default completedSlice.reducer;
