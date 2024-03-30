import api from "../api";
import ResponseWrapper from "../responseWrapper";
import { ICustomer } from "../../interfaces/Interfaces";

const getCustomers = () => {
  return api
    .get<ResponseWrapper<ICustomer>>(`${api.url.getCustomers}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const addCustomer = (
  customerCode: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  tax: string
) => {
  const data = { customerCode, name, email, phone, address, tax };
  return api
    .post<ResponseWrapper<object>>(api.url.addCustomer, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const updateCustomer = (
  id: number,
  customerCode: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  tax: string
) => {
  const data = { customerCode, name, email, phone, address, tax };
  return api
    .put<ResponseWrapper<object>>(`${api.url.updateCustomer}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const deleteCustomer = (id: number) => {
  return api
    .delete<ResponseWrapper<object>>(`${api.url.deleteCustomer}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const CustomerServices = {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
export default CustomerServices;
