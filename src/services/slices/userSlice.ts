import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '@cookie';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';

type TUserSlice = TUser & {
  checkUser: boolean;
};

const initialState: TUserSlice = {
  email: '',
  name: '',
  checkUser: false
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCheck: (state) => {
      state.checkUser = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.error(state, action);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        console.error(state, action);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        console.error(state, action);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.email = '';
        state.name = '';
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        console.error(state, action);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.error(state, action);
      });
  },
  selectors: {
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getChekUser: (state) => state.checkUser
  }
});

export const { getName, getEmail, getChekUser } = userSlice.selectors;
export const { setUserCheck } = userSlice.actions;
export { initialState as initialStateUser };
