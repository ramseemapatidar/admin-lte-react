import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './reducers/ui';
import { createLogger } from 'redux-logger';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger())
});

export default store;
