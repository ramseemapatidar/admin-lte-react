import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authentication: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state, { payload }) => {
      state.authentication = payload;
    },
  },
});

export const { setAuthentication } = authSlice.actions;

export default authSlice.reducer;
