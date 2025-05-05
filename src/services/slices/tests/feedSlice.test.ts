import { feedSlice, FeedsThunk, initialStateFeeds } from '@slices';
import { testOrder1, testOrder2 } from './fixtures';

describe('Слайс заказов', () => {
  describe('Ассинхронный редюсер', () => {
    it('Состояние: fulfilled', () => {
      const mockFeeds = {
        orders: [testOrder1, testOrder2],
        total: 10,
        totalToday: 2
      };
      const action = { type: FeedsThunk.fulfilled.type, payload: mockFeeds };
      const nextState = feedSlice.reducer(initialStateFeeds, action);

      expect(nextState.feeds).toEqual(mockFeeds);
    });

    it('Состояние: rejected', () => {
      const action = {
        type: FeedsThunk.rejected.type,
        error: { message: 'Error occurred' }
      };
      const nextState = feedSlice.reducer(initialStateFeeds, action);

      expect(nextState.feeds).toEqual(initialStateFeeds.feeds);
    });
  });
});
