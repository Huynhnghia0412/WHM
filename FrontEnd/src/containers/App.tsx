import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './../layouts/MainLayout';
import InWarehouse from './../pages/warehouse/InWarehouse';
import WarehouseLayout from './../layouts/WarehouseLayout';
import Dashboard from '../pages/dashboardOfWm/Dashboard';
import OutWarehouse from './../pages/warehouse/OutWarehouse';
import Product from './../pages/product/Product';
import ProductType from './../pages/productType/ProductType';
import CreateWarehouseInvenntory from './../pages/warehouseInventory/CreateWarehouseInvenntory';
import AllInOut from '../pages/warehouse/AllInOut';
import AllWarehouseInventory from './../pages/warehouseInventory/AllWarehouseInventory';
import AllCustomer from './../pages/customer/AllCustomer';
import InventoryReport from './../pages/report/InventoryReport';
import AdminLayout from './../layouts/AdminLyaout';
import UserManagement from './../pages/admin/UserManagement';
import RoleManagement from './../pages/admin/RoleManagement';
import Login from './../pages/auth/Login';
import AccountInfor from './../pages/auth/AccountInfor';
import AccountInforLayout from './../layouts/AccountInforLayout';
import RevenueReport from './../pages/report/RevenueReport';
import CustomerRevenueReport from './../pages/report/CustomerRevenueReport';
import InOutReport from './../pages/report/InOutReport';
import AllWareHouse from './../pages/warehouse/AllWareHouse';
import SendEmail from './../pages/auth/SendEmail';
import ChangePassword from '../pages/auth/ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { IUserModel } from '../interfaces/Interfaces';
import { Role_Admin } from './../utilities/SD';
import getAuthorizedUser from './../utilities/GetAuthorize';

function App() {
  const dispatch = useDispatch();
  const userData: IUserModel = getAuthorizedUser(dispatch, useSelector);

  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='sendEmail' element={<SendEmail />} />
        <Route path='changePassword' element={<ChangePassword />} />
      </Routes>
      {userData.id !== '' ? (
        <>
          {
            userData.role === Role_Admin ? (
              <>
                <Routes>
                  {/* warehouse */}
                  <Route path='*' element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='*' element={<WarehouseLayout />}>
                      <Route path='inWarehouse' element={<InWarehouse />} />
                      <Route path='outWarehouse' element={<OutWarehouse />} />
                      <Route path='allInOut' element={<AllInOut />} />
                      <Route path='allWareHouse' element={<AllWareHouse />} />
                      <Route path='product' element={<Product />} />
                      <Route path='productType' element={<ProductType />} />
                      <Route path='createWarehouseInvenntory' element={<CreateWarehouseInvenntory />} />
                      <Route path='allWarehouseInventory' element={<AllWarehouseInventory />} />
                    </Route>

                    {/* customer */}
                    <Route path='allCustomer' element={<AllCustomer />} />

                    {/* report */}
                    <Route path='inventoryReport' element={<InventoryReport />} />
                    <Route path='revenueReport' element={<RevenueReport />} />
                    <Route path='customerRevenueReport' element={<CustomerRevenueReport />} />
                    <Route path='inOutReport' element={<InOutReport />} />

                    {/* admin */}
                    <Route path='*' element={<AdminLayout />}>
                      <Route path='userManagement' element={<UserManagement />} />
                      <Route path='roleManagement' element={<RoleManagement />} />
                    </Route>

                    {/* account infor */}
                    <Route path='*' element={<AccountInforLayout />}>
                      <Route path='accountInfor' element={<AccountInfor />} />
                    </Route>
                  </Route>
                </Routes>
              </>
            ) : (
              <>

                <Routes>
                  {/* warehouse */}
                  <Route path='*' element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='*' element={<WarehouseLayout />}>
                      {userData.modifyInOutNote === "True" ? (
                        <>
                          <Route path='inWarehouse' element={<InWarehouse />} />
                          <Route path='outWarehouse' element={<OutWarehouse />} />
                        </>
                      ) : (
                        <></>
                      )}
                      {userData.readInOutNote === "True" && (
                        <Route path='allInOut' element={<AllInOut />} />
                      )}
                      {userData.readWarehouse === "True" ? (
                        <>
                          <Route path='allWareHouse' element={<AllWareHouse />} />
                        </>
                      ) : (
                        <></>
                      )}
                      {userData.readProduct === "True" ? (
                        <>
                          <Route path='product' element={<Product />} />
                        </>
                      ) : (
                        <></>
                      )}
                      {userData.readProductType === "True" ? (
                        <>
                          <Route path='productType' element={<ProductType />} />
                        </>
                      ) : (
                        <></>
                      )}
                      {userData.readCheckInventory === "True" ? (
                        <>
                          <Route path='allWarehouseInventory' element={<AllWarehouseInventory />} />
                        </>
                      ) : (
                        <></>
                      )}
                      {userData.modifyCheckInventory === "True" ? (
                        <>
                          <Route path='createWarehouseInvenntory' element={<CreateWarehouseInvenntory />} />
                        </>
                      ) : (
                        <></>
                      )}
                    </Route>

                    {/* customer */}
                    {userData.readCustomer === "True" ? (
                      <>
                        <Route path='allCustomer' element={<AllCustomer />} />
                      </>
                    ) : (
                      <></>
                    )}

                    {/* report */}
                    <Route path='inventoryReport' element={<InventoryReport />} />
                    <Route path='revenueReport' element={<RevenueReport />} />
                    <Route path='customerRevenueReport' element={<CustomerRevenueReport />} />
                    <Route path='inOutReport' element={<InOutReport />} />

                    {/* account infor */}
                    <Route path='*' element={<AccountInforLayout />}>
                      <Route path='accountInfor' element={<AccountInfor />} />
                    </Route>
                  </Route>
                </Routes>
              </>
            )
          }
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
