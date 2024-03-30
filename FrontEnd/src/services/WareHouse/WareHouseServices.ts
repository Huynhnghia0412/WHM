import api from "../api";
import ResponseWrapper from "../responseWrapper";
import { IWareHouse } from "../../interfaces/Interfaces";

const getWareHouses = () => {
  return api
    .get<ResponseWrapper<IWareHouse>>(`${api.url.getWarehouses}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const addWareHouse = (name: string, UserId: string) => {
  const data = {
    name,
    UserId,
  };
  return api
    .post<ResponseWrapper<object>>(api.url.addWarehouse, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const updateWareHouse = (id: number, name: string, UserId: string) => {
  const data = {
    name,
    UserId,
  };
  return api
    .put<ResponseWrapper<object>>(`${api.url.updateWarehouse}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const deleteWareHouse = (id: number) => {
  return api
    .delete<ResponseWrapper<object>>(`${api.url.deleteWarehouse}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const WareHouseServices = {
  getWareHouses,
  addWareHouse,
  updateWareHouse,
  deleteWareHouse,
};
export default WareHouseServices;
