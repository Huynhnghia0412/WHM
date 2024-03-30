import React, { useState, useEffect } from 'react'
import Input from './../../components/Input';
import { IUser } from './../../interfaces/Interfaces';
import inputHelper from '../../helper/InputHelper';

const AccountInfor = () => {
    const [userInfor, setUserInfor] = useState<IUser>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUser = inputHelper(event, { ...userInfor });
        setUserInfor(updatedUser);
    };

    useEffect(() => {
    }, []);

    return (
        <div className='bg-white p-3'>
            <h3>Thông tin tài khoản</h3>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Input
                            label="Mã:"
                            placeholder=""
                            name='userCode'
                            value={userInfor?.userCode || ''}
                            onChange={() => handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <Input
                            label="Email:"
                            placeholder=""
                            name='email'
                            value={userInfor?.email || ''}
                            onChange={() => handleInputChange}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <Input
                            label="Số điện thoại:"
                            placeholder=""
                            name='userCode'
                            value={userInfor?.phoneNumber || ''}
                            onChange={() => handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <Input
                            label="Địa chỉ:"
                            placeholder=""
                            name='address'
                            value={userInfor?.address || ''}
                            row={1}
                            onChange={() => handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <Input
                            label="Vai trò:"
                            placeholder=""
                            name='role'
                            value={userInfor?.roleId || ''}
                            onChange={() => handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <button className='btn btn-warning fw-bold px-5'>Lưu</button>
            </div>
        </div>
    )
}

export default AccountInfor