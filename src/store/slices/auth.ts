import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ILoginProps,
  login,
} from "../api/authAPI";
import { RootState } from "..";

interface ILoginState {
  accessToken: string;
  loggedInUser: null | any;
  isUserLoading: boolean;
  userMessage: string;


}

const initialState: ILoginState = {
  accessToken: "",
  loggedInUser: null,
  isUserLoading: false,
  userMessage: "",


};





export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: ILoginProps) => {
    const res: any = await login({
      email,
      password,
    });

    return res.data;
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(loginUserAsync.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.loggedInUser = action.payload.data[1];
        // state.accessToken = action.payload.data[0];
        state.userMessage = action.payload.message;

      })

  },
});

export const selectUserId = (state: RootState) =>
  state.authState.loggedInUser
export default auth.reducer;
