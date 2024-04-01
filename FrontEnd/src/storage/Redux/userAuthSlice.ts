import { createSlice } from "@reduxjs/toolkit";
import { IUserModel } from "../../interfaces/Interfaces";

export const emptyUserState: IUserModel = {
  fullName: "",
  id: "",
  email: "",
  role: "",
  readInOutNote: "",
  modifyInOutNote: "",
  readWarehouse: "",
  modifyWarehouse: "",
  readProduct: "",
  modifyProduct: "",
  readProductType: "",
  modifyProductType: "",
  readCheckInventory: "",
  modifyCheckInventory: "",
  readCustomer: "",
  modifyCustomer: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.readInOutNote = action.payload.readInOutNote;
      state.modifyInOutNote = action.payload.modifyInOutNote;
      state.readWarehouse = action.payload.readWarehouse;
      state.modifyWarehouse = action.payload.modifyWarehouse;
      state.readProduct = action.payload.readProduct;
      state.modifyProduct = action.payload.modifyProduct;
      state.readProductType = action.payload.readProductType;
      state.modifyProductType = action.payload.modifyProductType;
      state.readCheckInventory = action.payload.readCheckInventory;
      state.modifyCheckInventory = action.payload.modifyCheckInventory;
      state.readCustomer = action.payload.readCustomer;
      state.modifyCustomer = action.payload.modifyCustomer;
    },
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
