import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface IngredientsState {
  constructorIngredients: TConstructorIngredient[];
}

const initialState: IngredientsState = {
  constructorIngredients: [],
};

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
    state.constructorIngredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
    state.constructorIngredients = state.constructorIngredients.filter(b => b.id !== action.payload);
    }
  },
  selectors: {
    getConstructorIngredients: (state) => state.constructorIngredients
  }
});

export const { addIngredient, removeIngredient } = constructorSlice.actions;
export const { getConstructorIngredients } = constructorSlice.selectors;