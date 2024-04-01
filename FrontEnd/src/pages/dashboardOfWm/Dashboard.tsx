import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const warehouse = require("../../assets/images/inwarehouse.jpeg");

    return (
        <section>
            <div className="container mt-3">
                <div className="row">
                    <div className="container text-center">
                        <h4 className='fw-bold'>Quản lý nhập xuất kho</h4>
                        <hr />
                        <div className="row justify-content-center">
                            <div className="col-4 bg-white">
                                <div className="row ">
                                    <div className="col-3 pt-3">
                                        <img src={warehouse} alt="" className='img-fluid' />
                                    </div>
                                    <div className="col pt-3">
                                        <Link to={"/inWarehouse"} className='fs-5'>Nhập kho</Link>
                                        <p>- Thêm các phiếu nhập kho hàng hóa vào hệ thống</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 bg-white ms-4">
                                <div className="row">
                                    <div className="col-3 pt-3">
                                        <img src={warehouse} alt="" className='img-fluid' />
                                    </div>
                                    <div className="col pt-3">
                                        <Link to={"/outWarehouse"} className='fs-5'>Xuất kho</Link>
                                        <p>- Thêm các phiếu xuất kho hàng hóa vào hệ thống</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="row mt-3">
                                <div className="container text-center">
                                    <h4 className='fw-bold'>Quản lý khách hàng và nhà cung cấp</h4>
                                    <hr />
                                    <div className="row justify-content-center">
                                        <div className="col-8 bg-white">
                                            <div className="row ">
                                                <div className="col-5 pt-3">
                                                    <img src={warehouse} alt="" className='img-fluid' />
                                                </div>
                                                <div className="col pt-3">
                                                    <Link to={"/allCustomer"} className='fs-5'>KH/NCC</Link>
                                                    <p>- Quản lý thêm, sửa, xóa khách hàng/ncc</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row mt-3">
                                <div className="container text-center">
                                    <h4 className='fw-bold'>Quản lý Kho</h4>
                                    <hr />
                                    <div className="row justify-content-center">
                                        <div className="col-8 bg-white">
                                            <div className="row">
                                                <div className="col-5 pt-3">
                                                    <img src={warehouse} alt="" className='img-fluid' />
                                                </div>
                                                <div className="col pt-3">
                                                    <Link to={"/allWareHouse"} className='fs-5'>Kho</Link>
                                                    <p>- Quản lý thêm, sửa, xóa kho</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="row mt-3">
                                <div className="container text-center">
                                    <h4 className='fw-bold'>Quản lý hàng hóa</h4>
                                    <hr />
                                    <div className="row justify-content-center">
                                        <div className="col-5 bg-white">
                                            <div className="row ">
                                                <div className="col-5 pt-3">
                                                    <img src={warehouse} alt="" className='img-fluid' />
                                                </div>
                                                <div className="col pt-3">
                                                    <Link to={"/product"} className='fs-5'>Hàng hóa</Link>
                                                    <p>- Quản lý thêm, sửa, xóa khách hàng hóa</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-5 bg-white ms-3">
                                            <div className="row ">
                                                <div className="col-5 pt-3">
                                                    <img src={warehouse} alt="" className='img-fluid' />
                                                </div>
                                                <div className="col pt-3">
                                                    <Link to={"/productType"} className='fs-5'>Loại hàng</Link>
                                                    <p>- Quản lý thêm, sửa, xóa khách loại hàng hóa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row mt-3">
                                <div className="container text-center">
                                    <h4 className='fw-bold'>Báo cáo</h4>
                                    <hr />
                                    <div className="row justify-content-center">
                                        <div className="col-5 bg-white">
                                            <div className="row">
                                                <div className="col-5 pt-3">
                                                    <img src={warehouse} alt="" className='img-fluid' />
                                                </div>
                                                <div className="col pt-3">
                                                    <Link to={"/inOutReport"} className='fs-5'>Nhập xuất tồn</Link>
                                                    <p>- Báo cáo về nhập xuất tồn kho</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-5 bg-white ms-3">
                                            <div className="row">
                                                <div className="col-5 pt-3">
                                                    <img src={warehouse} alt="" className='img-fluid' />
                                                </div>
                                                <div className="col pt-3">
                                                    <Link to={"/revenueReport"} className='fs-5'>Doanh thu</Link>
                                                    <p>- Báo cáo doanh thu</p>
                                                </div>
                                            </div>
                                        </div>
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

export default Dashboard