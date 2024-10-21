import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Login } from '../../api/Login';
import { LoginInput } from '../../schema/AuthSchema';

export interface LoginInfo {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isActive: string;
  isDelete: string;
  image: string;
  role: string;
  userType: string;
  created_at: string;
  updated_at: string;
}

interface ILoginState {
  accessToken: string;
  loggedInUser: {
    adminId: string;
    email: string;
  };
  key: string;
  allLoginList: LoginInfo[];
  isLoginLoading: boolean;
  isLoginMessage: string;
  selectedLoginId: string;
}

const initialState: ILoginState = {
  accessToken: '',
  loggedInUser: {
    adminId: '',
    email: '',
  },
  key: '',
  allLoginList: [],
  isLoginLoading: false,
  isLoginMessage: '',
  selectedLoginId: '',
};

export const getAdminAsync = createAsyncThunk(
  "auth/login",
  async (email: LoginInput) => {
    const res: any = await Login(email);
    return res.data;
  }
);

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    getLoggesInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminAsync.pending, state => {
        state.isLoginLoading = true;
      })
      .addCase(getAdminAsync.fulfilled, (state, action) => {
        const { user, token } = action.payload;

        state.accessToken = token;
        state.loggedInUser = {
          adminId: user._id,
          email: user.email,
        };
        state.allLoginList = [user];
        state.isLoginLoading = false;
        state.selectedLoginId = user._id;

        console.log(action.payload);
      })
      .addCase(getAdminAsync.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginMessage = action.error.message || 'Login failed';
      });
  },
});

export const selectAllLoginInfoList = (state: RootState) =>
  state.authState.allLoginList;

export const selectLoginId = (state: RootState) =>
  state.authState.selectedLoginId;

export const selectLoginInfoMessage = (state: RootState) =>
  state.authState.isLoginMessage;

export const { getAccessToken, getLoggesInUser } = login.actions;

export default login.reducer;
