import React, { useState } from 'react'
import RevenueReportNavbar from '../../components/report/RevenueReportNavbar';
import UsefulFunctions from './../../utilities/UsefulFunctions';
import { ICustomer } from '../../interfaces/Interfaces';
import CustomerRevenueReportNavbar from './../../components/report/CustomerRevenueReportNavbar';

const CustomerRevenueReport = () => {
    const [revenue, setRevenue] = useState<number>(0);
    const [customer, setCustomer] = useState<ICustomer>();
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();


    const handleSetData = (revenue: number, customer: ICustomer) => {
        setRevenue(revenue);
        setCustomer(customer)
    }

    return (
        <section>
            <div className='container-fluid mt-3'>
                <div className='row p-0'>
                    <div className='col-2 p-0 m-0'>
                        <CustomerRevenueReportNavbar handleSetData={handleSetData} setFromDate={setFromDate} setToDate={setToDate} />
                    </div>
                    <div className='col'>
                        <div className='container bg-white p-5'>
                            <div className='text-center'>
                                <h1 className='fw-bold'>BÁO CÁO DOANH THU THEO KHÁCH HÀNG</h1>
                                <p className='m-0 mt-3'>
                                    <span className='fst-italic'>{fromDate && toDate && `Từ: ${UsefulFunctions.formatDateToShow(fromDate)} - Đến: ${UsefulFunctions.formatDateToShow(toDate)}`}</span>
                                </p>
                            </div>
                            <div className='pt-5 pb-4'>
                                <h5 className='fw-bold'>Tên khách hàng: <span className='fw-normal fs-5'>{customer ? customer.name : ''}</span></h5>
                            </div>
                            <div>
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <tr className='border border-black '>
                                            <th className='bg-body-tertiary'>STT</th>
                                            <th className='bg-body-tertiary'>Tên</th>
                                            <th className='bg-body-tertiary'>Giá trị</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Doanh thu</td>
                                            <td>{UsefulFunctions.formatVNPrice(revenue)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CustomerRevenueReport