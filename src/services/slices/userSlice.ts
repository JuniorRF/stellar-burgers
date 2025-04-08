import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchWithRefresh,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

const initialState: TUser = {
  email: '',
  name: ''
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (data) => await registerUserApi(data)
  );

  export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data) => await loginUserApi(data)
  );

  export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async () => await logoutApi()
  );

  export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data) => await updateUserApi(data)
  );
