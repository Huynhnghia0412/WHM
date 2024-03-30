import React, { useState, useEffect } from 'react'
import { ICustomer, ICustomerRevenueReportRequest } from '../../interfaces/Interfaces';
import inputHelper from '../../helper/InputHelper';
import ReportServices from './../../services/Report/ReportServices';
import SelectReport from './../SelectReport';
import CustomerServices from './../../services/Customer/CustomerServices';
import InputReport from './../InputReport';
import { defaultCustomer } from '../../utilities/DefaultObject';

const CustomerRevenueReportNavbar = ({ handleSetData, setFromDate, setToDate }: { setFromDate: (date: Date) => void, setToDate: (date: Date) => void, handleSetData: (revenue: number, customer: ICustomer) => void }) => {
    const [reportRquest, setRequestReport] = useState<ICustomerRevenueReportRequest>();
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    //error
    const [customerIdError, setCustomerIdError] = useState<string>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedReport = inputHelper(event, { ...reportRquest });
        setRequestReport(updatedReport);
    };

    useEffect(() => {
        CustomerServices.getCustomers().then((res) => {
            if (res.isSuccess) {
                setCustomers(res.result.customers || [])
            }
        })
    }, [])

    //report
    const searchReport = (
        customerId: number,
        fromDate: Date,
        toDate: Date
    ) => {
        ReportServices.searchCustomerRevenueReport(
            customerId,
            fromDate,
            toDate
        ).then((res) => {
            const foundCustomer = customers.find(pt => pt.id === parseInt(customerId.toString()));
            if (res.isSuccess) {
                handleSetData(res.result.revenue, foundCustomer || defaultCustomer);
                setFromDate(reportRquest?.fromDate || new Date())
                setToDate(reportRquest?.toDate || new Date())
            } else {
                setCustomerIdError(res.CustomerId);
            }
        })
    }

    return (
        <>
            <div>
                <div className='bg-nav-green border-nav-green py-2 px-4 text-white'>
                    <h6 className='m-0'>Lọc báo cáo</h6>
                </div>
                <div className='ps-2 pe-4'>
                    <div className='border border bg-white p-3'>
                        <h6 className='bg-body-grey p-1'>Chọn khách hàng:</h6>
                        <div className='text-center'>
                            <SelectReport
                                className='w-100'
                                options={customers.map(p => ({
                                    value: p.id.toString(),
                                    label: p.name
                                }))}
                                value={reportRquest?.customerId || 0}
                                name="customerId"
                                onChange={(e) => handleInputChange(e)}
                            />
                            {customerIdError !== '' ? <span className='text-danger'>{customerIdError}</span> : ''}
                        </div>
                        <hr />
                        <h6 className='bg-body-grey p-1'>Thời gian:</h6>
                        <div className='text-center'>
                            <p className='m-0'>Từ ngày:</p>
                            <InputReport
                                className='w-100'
                                placeholder=""
                                name='fromDate'
                                type='date'
                                value={reportRquest?.fromDate instanceof Date ? reportRquest?.fromDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <p className='m-0 mt-2'>Đến ngày:</p>
                            <InputReport
                                className='w-100'
                                name='toDate'
                                type='date'
                                value={reportRquest?.toDate instanceof Date ? reportRquest?.toDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <hr />
                        <button className='btn btn-success w-100'
                            onClick={() => searchReport(
                                reportRquest?.customerId || 0,
                                reportRquest?.fromDate || new Date(),
                                reportRquest?.toDate || new Date(),
                            )}
                        >Xem báo cáo</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerRevenueReportNavbar