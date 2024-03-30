import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    return (
        <>
            <div>
                <div className='bg-nav-green border-nav-green py-2 px-4 text-white'>
                    <h6 className='m-0'>Quản trị</h6>
                </div>
                <div className='ps-2 pe-4'>
                    <div className='border border bg-white navbar-hover'>
                        <Link to={"userManagement"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Người dùng</Link>
                    </div>
                    <div className='border border-top-0 border bg-white navbar-hover'>
                        <Link to={"roleManagement"} className='d-block m-0 text-decoration-none text-dark fw-bold py-2 px-4'>Vai trò</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminNavbar