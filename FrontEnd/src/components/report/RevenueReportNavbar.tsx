import React, { useState } from 'react'
import InputReport from './../InputReport';
import { IRevenueReportRequest } from './../../interfaces/Interfaces';
import inputHelper from '../../helper/InputHelper';
import ReportServices from './../../services/Report/ReportServices';

const RevenueReportNavbar = ({ handleSetData, setFromDate, setToDate }: { setFromDate: (date: Date) => void, setToDate: (date: Date) => void, handleSetData: (revenue: number) => void }) => {
    const [reportRquest, setRequestReport] = useState<IRevenueReportRequest>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedReport = inputHelper(event, { ...reportRquest });
        setRequestReport(updatedReport);
    };

    //report
    const searchReport = (
        fromDate: Date,
        toDate: Date
    ) => {
        ReportServices.searchRevenueReport(
            fromDate,
            toDate
        ).then((res) => {
            if (res.isSuccess) {
                handleSetData(res.result.revenue);
                setFromDate(reportRquest?.fromDate || new Date())
                setToDate(reportRquest?.toDate || new Date())
            } else {
                alert("Không thể xem báo cáo")
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
                            <hr />
                            <button className='btn btn-success w-100'
                                onClick={() => searchReport(
                                    reportRquest?.fromDate || new Date(),
                                    reportRquest?.toDate || new Date(),
                                )}
                            >Xem báo cáo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RevenueReportNavbar