import {
  ICustomer,
  IProduct,
  IProductType,
  IRequestInOutNote,
  IRole,
  IUser,
} from "../interfaces/Interfaces";
import { IItem } from "./../interfaces/Interfaces";

export const defaultNote: IRequestInOutNote = {
  id: 0,
  noteCode: "",
  noteDate: new Date(),
  des: "",
  wareHouseId: 0,
  customerId: 0,
  userId: "",
  noteItems: [],
  wareHouseName: "",
  customerName: "",
  userName: "",
  total: 0,
};

export const defaultItem: IItem = {
  id: 0,
  productId: 0,
  price: 0,
  quantity: 0,
  totalPrice: 0,
};

export const defaultProduct: IProduct = {
  id: 0,
  productCode: "",
  name: "",
  status: "",
  price: 0,
  quantity: 0,
  unit: "",
  des: "",
  productType: {
    id: 0,
    productTypeCode: "",
    name: "",
    detail: "",
  },
  productTypeId: 0,
  noteItems: "",
  quantityInWareHouse: 0,
};

export const defaultProductType: IProductType = {
  id: 0,
  productTypeCode: "",
  name: "",
  detail: "",
};

export const defaultCustomer: ICustomer = {
  id: 0,
  customerCode: "",
  name: "",
  phone: "",
  tax: "",
  email: "",
  address: "",
};

export const defaultRole: IRole = {
  id: "",
  name: "",
};

export const defaultUser: IUser = {
  id: "",
  userCode: "",
  userName: "",
  fullName: "",
  email: "",
  address: "",
  phoneNumber: "",
  gender: 0,
  role: defaultRole,
};
