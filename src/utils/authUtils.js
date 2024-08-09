import { logout } from '../store/reducers/auth';
export const isTokenExpired = (expiresIn) => {
  const currentTime = Date.now() / 1000;
  console.log(expiresIn,currentTime)
  return expiresIn < currentTime;
};

export const checkTokenExpiry = (dispatch) => {
  const auth = JSON.parse(localStorage.getItem('authentication'));
  const expiresIn = auth?.userInfo?.token?.expires_in;

  if (isTokenExpired(expiresIn)) {
    dispatch(logout());
  }
};
