import api from "../api";
import ResponseWrapper from "../responseWrapper";

const searchInOutReport = (
  productNameOrCode: string,
  productTypeId: number,
  fromDate: Date,
  toDate: Date
) => {
  const data = { productNameOrCode, productTypeId, fromDate, toDate };
  return api
    .post<ResponseWrapper<object>>(api.url.searchInOutReport, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const searchRevenueReport = (fromDate: Date, toDate: Date) => {
  const data = { fromDate, toDate };
  return api
    .post<ResponseWrapper<object>>(api.url.searchRevenueReport, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const searchCustomerRevenueReport = (
  customerId: number,
  fromDate: Date,
  toDate: Date
) => {
  const data = { customerId, fromDate, toDate };
  return api
    .post<ResponseWrapper<object>>(api.url.searchCustomerRevenueReport, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data.errors;
    });
};

const ReportServices = {
  searchInOutReport,
  searchRevenueReport,
  searchCustomerRevenueReport,
};
export default ReportServices;
