// api.js
const BASE_URL = "https://api.wenivops.co.kr/services/open-market/";

export const API = {
  LOGIN: `${BASE_URL}accounts/login/`,
  TOKEN_REFRESH: `${BASE_URL}accounts/token/refresh/`,
  VALIDATE_USERID: `${BASE_URL}accounts/validate-username/`,
  VALIDATE_COMANY_NUMBER: `${BASE_URL}accounts/seller/validate-registration-number/`,
  BUYER_SIGNUP: `${BASE_URL}accounts/buyer/signup/`,
  SELLER_SIGNUP: `${BASE_URL}accounts/seller/signup/`,
  PRODUCTS: `${BASE_URL}products/`
};
