import axios from 'axios';
import config from '../config/config';
import { setAuthentication } from '../store/reducers/auth';

export const authLogin = async (email, password) => {
  try {
    const response = await axios.post(`${config.API_URL}/login`, { email, password });

    if (response.data.success) {
      const data = response.data.data;
      const token = data.access_token;
      const user = 'ram'; // Assuming user info is returned

      // Store token and user info in local storage
      localStorage.setItem('authentication', JSON.stringify({ tokenInfo: data}));
      //localStorage.setItem('authentication', response.data.data);
      // Return the token and user info
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
    console.log(auth)
    const token = auth?.profile?.access_token;
    if (!token) {
      throw new Error('No token found');
    }

    await axios.post(`${config.API_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove the JWT token from localStorage

    return true;
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
  
