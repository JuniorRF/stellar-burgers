import { userSlice, setUserCheck, getUser, updateUser } from '@slices';

describe('Слайс пользователя', () => {
  const initialState = {
    email: '',
    name: '',
    checkUser: false
  };

  describe('Синхронный редюсер', () => {
    it('Стартовая проверка пользователя', () => {
      const action = setUserCheck();
      const newState = userSlice.reducer(initialState, action);

      expect(newState.checkUser).toBe(true);
    });
  });

  describe('Ассинхронные редюсеры', () => {
    it('Авторизация Состояние: fulfilled', () => {
        const mockUser = { user: {
            email: 'testEmail',
            name: 'testName'
          }
        }
      const action = { type: getUser.fulfilled.type, payload: mockUser};
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });
    it('Обновить пользователя Состояние: fulfilled', () => {
        const mockUser = { user: {
            email: 'newEmail',
            name: 'newName'
          }
        }
      const action = { type: updateUser.fulfilled.type, payload: mockUser};
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState.email).toEqual(mockUser.user.email);
      expect(nextState.name).toEqual(mockUser.user.name);
    });
  });
});