import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type PetType } from "@acme/gen-swag";

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [] as PetType[],
  },
  reducers: {
    setPets: (state, action: PayloadAction<PetType[]>) => {
      state.pets = action.payload;
    },
  },
});

export default petsSlice.reducer;

export const { setPets } = petsSlice.actions;
