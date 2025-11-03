import { createSlice } from "@reduxjs/toolkit";

export const FilterItems = createSlice({
  name: "FilterItems",
  initialState: { data: {}, isFilter: false },
  reducers: {
    setFilterPockemons: (state, action) => {
      state.data = action.payload.data;
      state.isFilter = action.payload.isFilter;
      state.count = action.payload.count;
    },
  },
});

export const { setFilterPockemons } = FilterItems.actions;
