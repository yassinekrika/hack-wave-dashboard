import api from "./api";
import TokenService from "./token.service";
import { loginFailure, loginStart, loginSuccess, resetUser } from "store/reducers/user";

const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await api.post("/dashboard/v1/auth/login", {
      username: user.username,
      password: user.password
    })
    if (response.data.success) {
      const data = response.data
      const user = { ...data.user, accessToken: data.access_token }
      TokenService.setUser(user);
      dispatch(loginSuccess(user))
    } else {
      dispatch(loginFailure())
    }
  } catch (error) {
    console.log(error)
  }

};

const logout = async (dispatch) => {
  try {
    await api.get("/dashboard/v1/auth/logout")
    TokenService.removeUser();
    dispatch(resetUser())
  } catch (error) {
    console.log(error)
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService; 