import { IUserModel } from "../interfaces/Interfaces";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../storage/Redux/userAuthSlice";
import { RootState } from "../storage/Redux/store";

const getAuthorizedUser = (dispatch: any, selector: any) => {
  const token = localStorage.getItem("token");

  if (token !== null) {
    const {
      fullName,
      id,
      email,
      role,
      readInOutNote,
      modifyInOutNote,
      readWarehouse,
      modifyWarehouse,
      readProduct,
      modifyProduct,
      readProductType,
      modifyProductType,
      readCheckInventory,
      modifyCheckInventory,
      readCustomer,
      modifyCustomer,
    }: IUserModel = jwtDecode(token);

    dispatch(
      setLoggedInUser({
        fullName,
        id,
        email,
        role,
        readInOutNote,
        modifyInOutNote,
        readWarehouse,
        modifyWarehouse,
        readProduct,
        modifyProduct,
        readProductType,
        modifyProductType,
        readCheckInventory,
        modifyCheckInventory,
        readCustomer,
        modifyCustomer,
      })
    );
  }

  const userData: IUserModel = selector(
    (state: RootState) => state.userAuthStore
  );
  return userData;
};

export default getAuthorizedUser;
