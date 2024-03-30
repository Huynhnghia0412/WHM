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
import ResetPassWord from '../pages/auth/ResetPassWord';
import AccountInfor from './../pages/auth/AccountInfor';
import AccountInforLayout from './../layouts/AccountInforLayout';
import RevenueReport from './../pages/report/RevenueReport';
import CustomerRevenueReport from './../pages/report/CustomerRevenueReport';
import InOutReport from './../pages/report/InOutReport';
import AllWareHouse from './../pages/warehouse/AllWareHouse';

function App() {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='resetPassWord' element={<ResetPassWord />} />



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
  );
}

export default App;
