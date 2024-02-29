import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    search: "",
    count: 0,
  },
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload.search;
    },
    updateCount: (state, action) => {
      state.count = state.count + action.payload.count;
    },
    removeCount: (state, action) => {
      state.count = state.count - action.payload.count;
    },
  },
});
export const { updateSearch, updateCount, removeCount } = userSlice.actions;
export default userSlice.reducer;
