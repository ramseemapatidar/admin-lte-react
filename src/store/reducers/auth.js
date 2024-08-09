import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isAuthenticated: !!localStorage.getItem('token'),
  isAppLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      const { token, user, expiresIn } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('tokenExpiration', Date.now() + expiresIn * 1000);
    },

    setProfile: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiration');
    },
  },
});

export const { setAuthentication,setProfile, logout } = authSlice.actions;

export const getAuthStatus = async () => {
  try {
    const authentication = localStorage.getItem('authentication');
    if (authentication) {
      return authentication; 
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const checkSession = () => async (dispatch) => {
  dispatch(setIsAppLoading(true));
  try {
    const authStatus = await getAuthStatus();
    if (authStatus) {
      dispatch(setAuthentication(authStatus));
    }
  } catch (error) {
    console.error('Error checking session:', error);
  } finally {
    dispatch(setIsAppLoading(false));
  }
};




export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${config.API_URL}/login`, { email, password });
    
    if (response.data.status === 'success') {
      const data = response.data.data;
      dispatch(setAuthentication({ token: data.token.access_token, user: data.user, expiresIn: data.token.expires_in }));
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    await axios.post(`${config.API_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logout());
  } catch (error) {
    console.error(error);
  }
};

export const getProfile = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    console.log(token);
    const response = await axios.post(`${config.API_URL}/profile`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    dispatch(setProfile(response.data.user));
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = (profileData) => async (dispatch, getState) => {
  try {
    const { token, user } = getState().auth;
    const response = await axios.post(`${config.API_URL}/update-profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === 'success') {
      console.log(user);
      const updatedUser = {
        ...user,
        name: profileData.get('name'),
        email: profileData.get('email'),
      };
      

      dispatch(setProfile(updatedUser));
      toast.success('Profile updated successfully!');
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const checkTokenExpiration = () => (dispatch) => {
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (tokenExpiration && Date.now() > tokenExpiration) {
    dispatch(logout());
  }

  
};

export default authSlice.reducer;
