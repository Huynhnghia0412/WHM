import api from "../api";
import ResponseWrapper from "../responseWrapper";
import { IProduct } from "../../interfaces/Interfaces";

const getProducts = () => {
  return api
    .get<ResponseWrapper<IProduct>>(`${api.url.getProducts}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const GetProductInWareHouses = (id: number) => {
  return api
    .get<ResponseWrapper<IProduct>>(`${api.url.getProductInWareHouses}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const addProduct = (
  productCode: string,
  name: string,
  status: string,
  price: number,
  unit: string,
  des: string,
  productTypeId: number
) => {
  const data = { productCode, name, status, price, unit, des, productTypeId };
  return api
    .post<ResponseWrapper<object>>(api.url.addProduct, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const updateProduct = (
  id: number,
  productCode: string,
  name: string,
  status: string,
  price: number,
  unit: string,
  des: string,
  productTypeId: number
) => {
  const data = { productCode, name, status, price, unit, des, productTypeId };
  return api
    .put<ResponseWrapper<object>>(`${api.url.updateProduct}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const deleteProduct = (id: number) => {
  return api
    .delete<ResponseWrapper<object>>(`${api.url.deleteProduct}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const ProductServices = {
  getProducts,
  GetProductInWareHouses,
  addProduct,
  updateProduct,
  deleteProduct,
};
export default ProductServices;
