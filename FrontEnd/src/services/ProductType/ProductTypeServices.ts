import api from "../api";
import ResponseWrapper from "../responseWrapper";
import { IProductType } from "./../../interfaces/Interfaces";

const getProductTypes = () => {
  return api
    .get<ResponseWrapper<IProductType>>(`${api.url.getProductTypes}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const addProductType = (
  productTypeCode: string,
  name: string,
  detail: string
) => {
  const data = { productTypeCode, name, detail };
  return api
    .post<ResponseWrapper<object>>(api.url.addProductType, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const updateProductType = (
  id: number,
  productTypeCode: string,
  name: string,
  detail: string
) => {
  const data = { productTypeCode, name, detail };
  return api
    .put<ResponseWrapper<object>>(`${api.url.updateProductType}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const deleteProductType = (id: number) => {
  return api
    .delete<ResponseWrapper<object>>(`${api.url.deleteProductType}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const ProductTypeServices = {
  getProductTypes,
  addProductType,
  updateProductType,
  deleteProductType,
};
export default ProductTypeServices;
