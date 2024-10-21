import axios from 'axios';
import { API_URL } from '../constant';
import { getLoggesInUser } from '../store/slices/login'; 
import { setLoader } from '../store/slices/loader';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface ILoginProps {
  email: string;
  password: string;
}

export const Login = createAsyncThunk('auth/login', async ({ email, password }: ILoginProps, { dispatch }) => {
  dispatch(setLoader(true));

  try {
    const response = await axios.post(API_URL.GET_ADMING_LOGIN, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { user, _id, team_id, access_token, refresh_token } = response.data.user;

    // Save tokens and user data to localStorage
    localStorage.setItem('cmsToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    localStorage.setItem('LoginEmail', email);
    localStorage.setItem('userId', _id);
    localStorage.setItem('teamId', team_id);

    dispatch(getLoggesInUser(user));

    toast.success('Login Successfully', {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    throw error; 
  } finally {
    dispatch(setLoader(false));
  }
});
