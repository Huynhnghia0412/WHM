import React, { useState } from 'react'
import RevenueReportNavbar from '../../components/report/RevenueReportNavbar';
import UsefulFunctions from './../../utilities/UsefulFunctions';

const RevenueReport = () => {
    const [revenue, setRevenue] = useState<number>(0);
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

    const handleSetData = (revenue: number) => {
        setRevenue(revenue);
    }

    return (
        <section>
            <div className='container-fluid mt-3'>
                <div className='row p-0'>
                    <div className='col-2 p-0 m-0'>
                        <RevenueReportNavbar handleSetData={handleSetData} setFromDate={setFromDate} setToDate={setToDate} />
                    </div>
                    <div className='col'>
                        <div className='container bg-white p-5'>
                            <div className='text-center'>
                                <h1 className='fw-bold'>BÁO CÁO DOANH THU</h1>
                                <p className='m-0 mt-3'>
                                    <span className='fst-italic'>{fromDate && toDate && `Từ: ${UsefulFunctions.formatDateToShow(fromDate)} - Đến: ${UsefulFunctions.formatDateToShow(toDate)}`}</span>
                                </p>
                            </div>
                            <div className='p-5'>
                            </div>
                            <div>
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <tr className='border border-black '>
                                            <th className='bg-body-tertiary'>STT</th>
                                            <th className='bg-body-tertiary'>Tên</th>
                                            <th className='bg-body-tertiary'>Số tiền</th>
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

export default RevenueReport