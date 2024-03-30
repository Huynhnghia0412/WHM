import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div>
                <div className='bg-nav-green border-nav-green py-2 px-4 text-white'>
                    <h6 className='m-0'>Kho</h6>
                </div>
                <div className='ps-2 pe-4'>
                    <div className='border border bg-white navbar-hover'>
                        <Link to={"/inWarehouse"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Nhập kho</Link>
                    </div>
                    <div className='border border-top-0 border bg-white navbar-hover'>
                        <Link to={"/outWarehouse"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Xuất kho</Link>
                    </div>
                    <div className='border border-top-0 border bg-white navbar-hover'>
                        <Link to={"/allInOut"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Xem tất cả phiếu</Link>
                    </div>
                    <div className='border border-top-0 border bg-white navbar-hover'>
                        <Link to={"/allWareHouse"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Kho</Link>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <div className='bg-nav-green border-nav-green py-2 px-4 text-white'>
                    <h6 className='m-0'>Hàng hóa</h6>
                </div>
                <div className='ps-2 pe-4'>
                    <div className='border border bg-white navbar-hover'>
                        <Link to={"product"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Tồn kho</Link>
                    </div>
                    <div className='border border-top-0 border bg-white navbar-hover'>
                        <Link to={"productType"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Loại hàng</Link>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <div className='bg-nav-green border-nav-green py-2 px-4 text-white'>
                    <h6 className='m-0'>Kiểm kê</h6>
                </div>
                <div className='ps-2 pe-4'>
                    <div className='border border bg-white navbar-hover'>
                        <Link to={"createWarehouseInvenntory"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Tạo phiếu kiểm</Link>
                    </div>
                    <div className='border border-top-0 border bg-white navbar-hover'>
                        <Link to={"allWarehouseInventory"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Xem tất cả</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar