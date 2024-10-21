import { createSlice } from '@reduxjs/toolkit';

interface ILoader {
  isActive: boolean;
}

const initialState: ILoader = {
  isActive: false,
};

const loader = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state: ILoader, action: { payload: boolean }) => {
      Object.assign(state, { isActive: action.payload });
    },
  },
});

export const { setLoader } = loader.actions;

export default loader.reducer;
