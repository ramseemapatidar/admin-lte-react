import axios from 'axios';
import config from '../config/config';
import { setAuthentication } from '../store/reducers/auth';

export const authLogin = async (email, password) => {
  try {
    const response = await axios.post(`${config.API_URL}/login`, { email, password });
    if (response.data.status=='success') {
      const data = response.data.data;
      localStorage.setItem('authentication', JSON.stringify({ userInfo: data}));
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const getAuthStatus = async () => {
  try {
    let authentication = localStorage.getItem('authentication');
    if (authentication) {
      return JSON.parse(authentication);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const checkSession = async (dispatch, setIsAppLoading) => {
  setIsAppLoading(true); 

  try {
    const authStatus = await getAuthStatus(); 

    if (authStatus) {
      dispatch(setAuthentication(authStatus));
    }
  } catch (error) {
    console.error("Error checking session:", error);
  } finally {
    setIsAppLoading(false);
  }
};

export const logoutUser = async () => {
  try {
    const auth = JSON.parse(localStorage.getItem('authentication'));
    
    const token = auth.userInfo.token.access_token;
    const response = await axios.post(`${config.API_URL}/logout`, null, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(response);
    if (response.data.status=='success') {
      const data = response.data.data;
      return data;
    }

  } catch (error) {
    throw error
  }
};
  
export const getUserProfile = async () => {
  try {
    const auth = JSON.parse(localStorage.getItem('authentication'));
    if (!auth) throw new Error('No authentication data found');

    const token = auth.userInfo.token.access_token;
    const response = await axios.post(`${config.API_URL}/profile`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === 'success') {
      const data = response.data.data;
      return data;
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.post(`${config.API_URL}/update-profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('authentication')).userInfo.token.access_token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
