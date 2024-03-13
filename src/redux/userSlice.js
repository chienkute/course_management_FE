import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    search: "",
    count: 0,
    url: "",
    updated: false,
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
    setCount: (state, action) => {
      state.count = action.payload.count;
    },
    setUrl: (state, action) => {
      state.url = action.payload.url;
    },
    setUpdated: (state, action) => {
      state.updated = action.payload.updated;
    },
  },
});
export const {
  updateSearch,
  updateCount,
  removeCount,
  setCount,
  setUrl,
  setUpdated,
} = userSlice.actions;
export default userSlice.reducer;
