import axios from "axios";

// const sessionId = localStorage.getItem("sessionId");

const url = {
  baseUrl: "https://localhost:7153/api",
  // auth
  login: "Auth/Login",
  sendEmail: "ForgotPassword/SendEmail",
  changePassword: "ForgotPassword/ChangePassword",

  //warehouse
  getWarehouses: "Warehouse/GetWarehouses",
  addWarehouse: "Warehouse/AddWarehouse",
  updateWarehouse: "Warehouse/UpdateWarehouse",
  deleteWarehouse: "Warehouse/DeleteWarehouse",

  //productType
  getProductTypes: "ProductType/GetProductTypes",
  addProductType: "ProductType/AddProductType",
  updateProductType: "ProductType/UpdateProductType",
  deleteProductType: "ProductType/DeleteProductType",

  //product
  getProducts: "Product/GetProducts",
  getProductInWareHouses: "Product/GetProductInWareHouses",
  addProduct: "Product/AddProduct",
  updateProduct: "Product/UpdateProduct",
  deleteProduct: "Product/DeleteProduct",

  //Customer
  getCustomers: "Customer/GetCustomers",
  addCustomer: "Customer/AddCustomer",
  updateCustomer: "Customer/UpdateCustomer",
  deleteCustomer: "Customer/DeleteCustomer",

  //user
  getEmployees: "User/GetEmployees",
  getRoles: "User/GetRoles",
  getRolesInCludeClaims: "User/GetRolesInCludeClaims",
  addRole: "User/AddRole",
  updateRole: "User/UpdateRole",
  deleteRole: "User/DeleteRole",
  addUser: "User/AddUser",
  updateUser: "User/UpdateUser",
  deleteUser: "User/DeleteUser",

  //note
  getInOutNotes: "Note/GetInOutNotes",
  getInventoryNotes: "Note/GetInventoryNotes",
  getCheckInventoryProducts: "Note/GetCheckInventoryProducts",
  getNote: "Note/GetNote",
  addInOutNote: "Note/AddInOutNote",
  updateInOutNote: "Note/UpdateInOutNote",
  deleteNote: "Note/DeleteNote",

  //report
  searchInOutReport: "Report/SearchInOutReport",
  searchRevenueReport: "Report/SearchRevenueReport",
  searchCustomerRevenueReport: "Report/SearchCustomerRevenueReport",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  url: url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default api;
