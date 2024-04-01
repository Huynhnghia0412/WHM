import api from "../api";
import ResponseWrapper from "../responseWrapper";

const login = (username: string, password: string) => {
  const data = {
    username,
    password,
  };
  return api
    .post<ResponseWrapper<object>>(api.url.login, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const sendEmail = (email: string) => {
  const data = {
    email,
  };
  return api
    .post<ResponseWrapper<object>>(`${api.url.sendEmail}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const changePassword = (
  userId: string,
  password: string,
  resetToken: string
) => {
  const data = {
    userId,
    password,
    resetToken,
  };
  return api
    .post<ResponseWrapper<object>>(`${api.url.changePassword}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const AuthServices = {
  login,
  sendEmail,
  changePassword,
};
export default AuthServices;
