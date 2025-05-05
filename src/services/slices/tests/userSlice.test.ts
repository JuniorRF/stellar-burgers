import {
  userSlice,
  setUserCheck,
  getUser,
  updateUser,
  initialStateUser
} from '@slices';

describe('Слайс пользователя', () => {
  describe('Синхронный редюсер', () => {
    it('Стартовая проверка пользователя', () => {
      const action = setUserCheck();
      const newState = userSlice.reducer(initialStateUser, action);

      expect(newState.checkUser).toBe(true);
    });
  });

  describe('Ассинхронные редюсеры', () => {
    it('Авторизация Состояние: fulfilled', () => {
      const mockUser = {
        user: {
          email: 'testEmail',
          name: 'testName'
        }
      };
      const action = { type: getUser.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(initialStateUser, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });
    it('Обновить пользователя Состояние: fulfilled', () => {
      const mockUser = {
        user: {
          email: 'newEmail',
          name: 'newName'
        }
      };
      const action = { type: updateUser.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(initialStateUser, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });
  });
});
