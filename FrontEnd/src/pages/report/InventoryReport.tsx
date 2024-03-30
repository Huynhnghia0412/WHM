import React, { useState } from 'react'
import InOutReportNavbar from './../../components/report/InOutReportNavbar';
import { IProduct, IProductType } from '../../interfaces/Interfaces';
import UsefulFunctions from './../../utilities/UsefulFunctions';

const InventoryReport = () => {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [productType, setProductType] = useState<IProductType>();
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

    const handleSetData = (productList: IProduct[], productType: IProductType, totalQuantity: number, totalValue: number) => {
        setProductList(productList);
        setTotalQuantity(totalQuantity)
        setTotalValue(totalValue)
        setProductType(productType)
    }

    return (
        <section>
            <div className='container-fluid mt-3'>
                <div className='row p-0'>
                    <div className='col-2 p-0 m-0'>
                        <InOutReportNavbar handleSetData={handleSetData} setFromDate={setFromDate} setToDate={setToDate} />
                    </div>
                    <div className='col'>
                        <div className='container bg-white p-5'>
                            <div className='text-center'>
                                <h1 className='fw-bold'>BÁO CÁO TỒN KHO</h1>
                                <p className='m-0 mt-3'>
                                    <span className='fst-italic'>{fromDate && toDate && `Từ: ${UsefulFunctions.formatDateToShow(fromDate)} - Đến: ${UsefulFunctions.formatDateToShow(toDate)}`}</span>
                                </p>
                            </div>
                            <div className='p-5'>
                                <h5 className='fw-bold'>Loại hàng: </h5>
                            </div>
                            <div>
                                <table className='table table-bordered text-center'>
                                    <thead>
                                        <tr className='border border-black '>
                                            <th className='bg-body-tertiary'>STT</th>
                                            <th className='bg-body-tertiary'>Mã hàng</th>
                                            <th className='bg-body-tertiary'>Tên hàng</th>
                                            <th className='bg-body-tertiary'>Giá vốn</th>
                                            <th className='bg-body-tertiary'>Tồn kho</th>
                                            <th className='bg-body-tertiary'>Giá trị tồn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productList.map((p: IProduct, index: number) => (
                                            <tr key={p.id}>
                                                <td>{index + 1}</td>
                                                <td>{p.productCode}</td>
                                                <td>{p.name}</td>
                                                <td>{UsefulFunctions.formatVNPrice(p.price)}</td>
                                                <td>{UsefulFunctions.formatVNPrice(p.quantityInWareHouse)}</td>
                                                <td>{UsefulFunctions.formatVNPrice(p.quantityInWareHouse * p.price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className='border-top border-bottom py-3 bg-light'>
                                    <div className="row justify-content-end">
                                        <div className="col-2">Tổng sl tồn: {UsefulFunctions.formatVNPrice(totalQuantity)}</div>
                                        <div className="col-3">Tổng giá trị tồn: {UsefulFunctions.formatVNPrice(totalValue)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default InventoryReport