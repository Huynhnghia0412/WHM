import React from 'react'
import { Link } from 'react-router-dom'

const AccountInforNavbar = () => {
    return (
        <>
            <div>
                <div className='bg-nav-green border-nav-green py-2 px-4 text-white'>
                    <h6 className='m-0'>Thông tin tài khoản</h6>
                </div>
                <div className='ps-2 pe-4'>
                    <div className='border border bg-white navbar-hover'>
                        <Link to={"/accountInfor"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Thông tin</Link>
                    </div>
                    <div className='border border-top-0 border bg-white navbar-hover'>
                        <Link to={"/resetPassword"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Đổi mật khẩu</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountInforNavbar