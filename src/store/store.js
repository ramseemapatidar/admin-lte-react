import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './reducers/ui';
import { authSlice } from './reducers/auth';

import { createLogger } from 'redux-logger';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger())
});

export default store;
