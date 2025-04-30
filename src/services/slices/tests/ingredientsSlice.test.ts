import {
  ingredientsSlice,
  IngredientsThunk,
  initialStateIngredients
} from '@slices';
import { testBun, testIngredient } from './fixtures';

describe('Слайс ингредиента', () => {
  describe('Ассинхронный редюсер', () => {
    it('Состояние: pending', () => {
      const action = { type: IngredientsThunk.pending.type };
      const newState = ingredientsSlice.reducer(
        initialStateIngredients,
        action
      );
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toHaveLength(0);
    });

    it('Состояние: fulfilled', () => {
      const mockIngredients = [testBun, testIngredient];
      const action = {
        type: IngredientsThunk.fulfilled.type,
        payload: mockIngredients
      };
      const newState = ingredientsSlice.reducer(
        initialStateIngredients,
        action
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual(mockIngredients);
    });

    it('Состояние: rejected', () => {
      const action = {
        type: IngredientsThunk.rejected.type,
        error: { message: 'Error occurred' }
      };
      const newState = ingredientsSlice.reducer(
        initialStateIngredients,
        action
      );

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Error occurred');
      expect(newState.ingredients).toHaveLength(0);
    });
  });
});
