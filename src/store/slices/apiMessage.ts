import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IApiMessage {
  message: string;
  type: string;
}

const initialState: IApiMessage = {
  message: '',
  type: '',
};

const apiMessages = createSlice({
  name: 'apiMessages',
  initialState,
  reducers: {
    setApiMessage: (state, action:PayloadAction<IApiMessage>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setApiMessage } = apiMessages.actions;

export default apiMessages.reducer;
