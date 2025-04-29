import { feedSlice, FeedsThunk } from '@slices';
import { testOrder1, testOrder2 } from './fixtures'

describe('Слайс заказов', () => {
  const initialState = {
    feeds: {
      orders: [],
      total: 0,
      totalToday: 0
    }
  };

  describe('Ассинхронный редюсер', () => {
    it('Состояние: fulfilled', () => {
      const mockFeeds = {
        orders: [testOrder1, testOrder2],
        total: 10,
        totalToday: 2
      };
      const action = { type: FeedsThunk.fulfilled.type, payload: mockFeeds };
      const nextState = feedSlice.reducer(initialState, action);

      expect(nextState.feeds).toEqual(mockFeeds);
    });

    it('Состояние: rejected', () => {
      const action = { type: FeedsThunk.rejected.type, error: { message: 'Error occurred' } };
      const nextState = feedSlice.reducer(initialState, action);

      expect(nextState.feeds).toEqual(initialState.feeds);
    });
  });
});