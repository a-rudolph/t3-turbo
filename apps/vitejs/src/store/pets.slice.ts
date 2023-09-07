import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { type PetType } from "@acme/gen-swag";

import { getPets } from "../services/get-pets";

export const fetchPetsThunk = createAsyncThunk(
  "pets/fetchPets",
  async (query?: string | null) => {
    const response = await getPets({ query });

    return { pets: response.pets };
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetsThunk.fulfilled, (state, action) => {
        state.pets = action.payload.pets;
      })
      .addMatcher(
        (action: { type: string }) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          console.log("start loading ", action.type);
        },
      )
      .addMatcher(
        (action: { type: string }) => {
          return action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          console.log("end loading ", action.type);
        },
      );
  },
});

export default petsSlice.reducer;

export const { setPets } = petsSlice.actions;
