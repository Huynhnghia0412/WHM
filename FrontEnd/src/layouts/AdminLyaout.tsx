import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './../components/AdminNavbar';

const AdminLayout = () => {
    return (
        <section>
            <div className='container-fluid mt-3'>
                <div className='row p-0'>
                    <div className='col-2 p-0 m-0'>
                        <AdminNavbar />
                    </div>
                    <div className='col'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminLayout