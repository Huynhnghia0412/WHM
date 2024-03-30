import api from "../api";
import ResponseWrapper from "../responseWrapper";
import { IRole, IRoleClaims, IUser } from "../../interfaces/Interfaces";
import { IUserClaims } from "./../../interfaces/Interfaces";

const getEmployees = () => {
  return api
    .get<ResponseWrapper<IUser>>(`${api.url.getEmployees}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const getRoles = () => {
  return api
    .get<ResponseWrapper<IRole>>(`${api.url.getRoles}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const getRolesInCludeClaims = () => {
  return api
    .get<ResponseWrapper<IRole>>(`${api.url.getRolesInCludeClaims}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const addRole = (name: string, claims: IRoleClaims[]) => {
  const data = { name, claims };
  return api
    .post<ResponseWrapper<IRole>>(`${api.url.addRole}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const updateRole = (id: string, name: string, claims: IRoleClaims[]) => {
  const data = { name, claims };
  return api
    .put<ResponseWrapper<IRole>>(`${api.url.updateRole}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const deleteRole = (id: string) => {
  return api
    .delete<ResponseWrapper<IRole>>(`${api.url.deleteRole}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

// user

const addUser = (
  userName: string,
  passWord: string,
  userCode: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  tax: string,
  address: string,
  roleId: string,
  claims: IUserClaims[]
) => {
  const data = {
    userName,
    passWord,
    userCode,
    fullName,
    email,
    phoneNumber,
    tax,
    address,
    roleId,
    claims,
  };
  return api
    .post<ResponseWrapper<IRole>>(`${api.url.addUser}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const updateUser = (
  id: string,
  userCode: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  tax: string,
  address: string,
  roleId: string,
  claims: IUserClaims[]
) => {
  const data = {
    userCode,
    fullName,
    email,
    phoneNumber,
    tax,
    address,
    roleId,
    claims,
  };
  return api
    .put<ResponseWrapper<IRole>>(`${api.url.updateUser}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const deleteUser = (id: string) => {
  return api
    .delete<ResponseWrapper<IRole>>(`${api.url.deleteUser}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const UserServices = {
  getEmployees,
  getRoles,
  getRolesInCludeClaims,
  addRole,
  updateRole,
  deleteRole,
  addUser,
  updateUser,
  deleteUser,
};
export default UserServices;
