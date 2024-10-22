import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader } from "../store/slices/loader";
import axios from "axios";
import { API_URL } from "../constant";
import { toast } from "react-toastify";
interface IRegisterProps {
    email: string;
    password: string;
    companyName: string;
  }
export const Register = createAsyncThunk('auth/login', async ({ email, password, companyName }: IRegisterProps, { dispatch }) => {
    dispatch(setLoader(true));
  
    try {
      const response = await axios.post(API_URL.POST_REGISTER_USER, { email, password, companyName }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
  
    //   dispatch(getLoggesInUser(user));
  
      toast.success('Register Successfully', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.success('Registration link sent. Please check your email to complete registration.', {
        position: 'top-right',
        autoClose: 4000,
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