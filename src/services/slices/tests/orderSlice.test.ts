import { ordersSlice, userOrdersThunk } from '@slices';
import { testOrder1, testOrder2 } from './fixtures'

describe('Слайс заказов пользователя', () => {
  const initialState = {
    isLoad: false,
    userOrders: []
  };

  describe('Ассинхронный редюсер', () => {
    it('Состояние: pending', () => {
      const action = { type: userOrdersThunk.pending.type };
      const nextState = ordersSlice.reducer(initialState, action);

      expect(nextState.isLoad).toBe(true);
      expect(nextState.userOrders).toHaveLength(0);
    });

    it('Состояние: fulfilled', () => {
      const mockOrders = [[testOrder1, testOrder2]];
      const action = { type: userOrdersThunk.fulfilled.type, payload: mockOrders };
      const nextState = ordersSlice.reducer(initialState, action);

      expect(nextState.isLoad).toBe(false);
      expect(nextState.userOrders).toEqual(mockOrders);
    });

    it('Состояние: rejected', () => {
      const action = { type: userOrdersThunk.rejected.type, error: { message: 'Error occurred' } };
      const nextState = ordersSlice.reducer(initialState, action);

      expect(nextState.isLoad).toBe(false);
      expect(nextState.userOrders).toHaveLength(0);
    });
  });
});