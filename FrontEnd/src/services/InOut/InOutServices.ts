import api from "../api";
import ResponseWrapper from "../responseWrapper";
import { IItem, IRequestInOutNote } from "./../../interfaces/Interfaces";

const getInOutNotes = () => {
  return api
    .get<ResponseWrapper<IRequestInOutNote>>(`${api.url.getInOutNotes}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const getInOutNote = (id: number) => {
  return api
    .get<ResponseWrapper<IRequestInOutNote>>(`${api.url.getNote}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const addInOutNote = (
  noteCode: string,
  noteDate: Date,
  des: string,
  customerId: number,
  wareHouseId: number,
  userId: string,
  productList: IItem[]
) => {
  const data = {
    noteCode,
    noteDate,
    des,
    customerId,
    wareHouseId,
    userId,
    productList,
  };
  return api
    .post<ResponseWrapper<object>>(api.url.addInOutNote, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const updateInOutNote = (
  id: number,
  noteCode: string,
  noteDate: Date,
  des: string,
  customerId: number,
  wareHouseId: number,
  userId: string,
  productList: IItem[]
) => {
  const data = {
    noteCode,
    noteDate,
    des,
    customerId,
    wareHouseId,
    userId,
    productList,
  };
  return api
    .put<ResponseWrapper<object>>(`${api.url.updateInOutNote}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const deleteNote = (id: number) => {
  return api
    .delete<ResponseWrapper<IRequestInOutNote>>(`${api.url.deleteNote}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const InOutServices = {
  addInOutNote,
  updateInOutNote,
  getInOutNotes,
  deleteNote,
  getInOutNote,
};
export default InOutServices;
