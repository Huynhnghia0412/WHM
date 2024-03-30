import api from "../api";
import ResponseWrapper from "../responseWrapper";
import { IProduct, IRequestInOutNote } from "./../../interfaces/Interfaces";

const getCheckInventoryProducts = () => {
  return api
    .get<ResponseWrapper<IProduct>>(`${api.url.getCheckInventoryProducts}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const getInventoryNotes = () => {
  return api
    .get<ResponseWrapper<IRequestInOutNote>>(`${api.url.getInventoryNotes}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const CheckInventoryServices = {
  getCheckInventoryProducts,
  getInventoryNotes,
};
export default CheckInventoryServices;
