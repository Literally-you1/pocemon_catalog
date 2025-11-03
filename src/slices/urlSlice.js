import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: "https://pokeapi.co/api/v2/",
  reducers: {
    setApiUrl: (state, action) => action.payload,
  },
});

export const { setApiUrl } = itemSlice.actions;
