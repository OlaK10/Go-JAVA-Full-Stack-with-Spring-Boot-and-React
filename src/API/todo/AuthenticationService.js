import axios from "axios";
import {API_URL} from "../../Constants.js";

export const USERNAME_SESSION_ATTRIBUTE_NAME = 'authenticated user'

class AuthenticationService {

  executeBasicAuthService(username, password) {
    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return axios.get(`${API_URL}/basicauth`, {
      headers: {authorization: basicAuthHeader}
    })
  }

  executeJWTAuthService(username, password) {
    return axios.post(`${API_URL}/authenticate`, {username, password});
  }
  
  registerSuccessfulLogin(username, password) {
    // put the values in session storage
    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    console.log("registerSuccessfulLogin")
    sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(basicAuthHeader);
  }

  registerSuccessfulLoginJWT(username, token) {
    sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
    let jwtAuth = "Bearer " + token;
    this.setupAxiosInterceptors(jwtAuth);
  }
 

  logout() {
    console.log("logout");
    sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
    if (user == null) {
      return false;
    } else {
      return true;
    }
  }

  getLoggedInUsername() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
    if (user == null) {
      return "";
    } else {
      return user;
    }
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = token;
      }
      return config;
    });
  }
  
}
export default new AuthenticationService();
