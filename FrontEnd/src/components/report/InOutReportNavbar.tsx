import React, { useEffect, useState } from 'react'
import ProductTypeServices from './../../services/ProductType/ProductTypeServices';
import { IInOutReportRequest, IProductType } from '../../interfaces/Interfaces';
import inputHelper from './../../helper/InputHelper';
import InputReport from './../InputReport';
import SelectReport from './../SelectReport';
import ReportServices from './../../services/Report/ReportServices';
import { IProduct } from './../../interfaces/Interfaces';
import { defaultProductType } from '../../utilities/DefaultObject';

const InOutReportNavbar = ({ handleSetData, setFromDate, setToDate }: { setFromDate: (date: Date) => void, setToDate: (date: Date) => void, handleSetData: (productList: IProduct[], productType: IProductType, totalQuantity: number, totalValue: number) => void }) => {

    const [productTypes, setProductTypes] = useState<IProductType[]>([]);
    const [reportRquest, setRequestReport] = useState<IInOutReportRequest>();
    const [loading, setLoading] = useState<boolean>(true); // Thêm biến trạng thái loading

    useEffect(() => {
        ProductTypeServices.getProductTypes().then((res) => {
            if (res.isSuccess) {
                setProductTypes(res.result.productTypes || [])
                setLoading(false);
            }
        })
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedReport = inputHelper(event, { ...reportRquest });
        setRequestReport(updatedReport);
    };

    //report
    const searchReport = (
        productNameOrCode: string,
        productTypeId: number,
        fromDate: Date,
        toDate: Date
    ) => {
        if (loading) return;
        ReportServices.searchInOutReport(
            productNameOrCode,
            productTypeId,
            fromDate,
            toDate
        ).then((res) => {
            const foundProductType = productTypes.find(pt => pt.id === parseInt(productTypeId.toString()));
            if (res.isSuccess) {
                handleSetData(res.result.products, foundProductType || defaultProductType, res.result.totalQuantity, res.result.totalValue);
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
                        <h6 className='bg-body-grey p-1'>Tìm kiếm hàng hóa:</h6>
                        <InputReport
                            placeholder="Tên/Mã"
                            name='productNameOrCode'
                            type='search'
                            value={reportRquest?.productNameOrCode || ''}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <h6 className='bg-body-grey p-1 mt-4'>Loại hàng:</h6>
                        <SelectReport
                            className='w-100'
                            options={productTypes.map(p => ({
                                value: p.id.toString(),
                                label: p.name
                            }))}
                            value={reportRquest?.productTypeId || 0}
                            name="productTypeId"
                            onChange={(e) => handleInputChange(e)}
                        />
                        <h6 className='bg-body-grey p-1 mt-4'>Thời gian:</h6>
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
                                reportRquest?.productNameOrCode || '',
                                reportRquest?.productTypeId || 0,
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

export default InOutReportNavbar