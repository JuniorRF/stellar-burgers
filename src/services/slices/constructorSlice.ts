import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type IngredientsState = {
  constructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: IngredientsState = {
  constructor: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructor.bun = action.payload;
        } else {
          state.constructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index - 1];
      state.constructor.ingredients[index - 1] = temp;
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index + 1];
      state.constructor.ingredients[index + 1] = temp;
    }
  },
  selectors: {
    getConstructorIngredients: (state) => state
  }
});

export const { addIngredient, removeIngredient, moveUp, moveDown } =
  constructorSlice.actions;
export const { getConstructorIngredients } = constructorSlice.selectors;
