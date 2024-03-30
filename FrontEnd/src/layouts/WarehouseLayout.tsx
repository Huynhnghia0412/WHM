import React from 'react'
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom'

const WarehouseLayout = () => {
    return (
        <section>
            <div className='container-fluid mt-3'>
                <div className='row p-0'>
                    <div className='col-2 p-0 m-0'>
                        <Navbar />
                    </div>
                    <div className='col'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WarehouseLayout