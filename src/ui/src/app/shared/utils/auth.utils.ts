import { JwtHelperService } from '@auth0/angular-jwt';

export const getJwt = (window: Window) => {
  if (!window || !window.localStorage) {
    return '';
  }
  const jwt = window.localStorage.getItem('Auth');

  if (!jwt) {
    return '';
  }

  return jwt;
};

export const isAuth = (window: Window) => {
  const jwt = getJwt(window);
  console.log('isAuth', jwt);
  if (!jwt) {
    return false;
  }
  const jwtHelper = new JwtHelperService();
  return !jwtHelper.isTokenExpired(jwt);
};
