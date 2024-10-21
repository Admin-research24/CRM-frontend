import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './slices';

const store = configureStore({
    reducer: {
        apiMessage: reducers.apiMessage,
        authState: reducers.login,
        loader: reducers.loader,
        contact: reducers.contact,
        email: reducers.email,
        emailTemplate: reducers.emailTemplate,
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;