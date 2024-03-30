import React, { useState } from 'react'
import Input from '../../components/Input'
import { ILogin } from './../../interfaces/Interfaces';
import inputHelper from '../../helper/InputHelper';
import { Link } from 'react-router-dom';

const ResetPassWord = () => {
    const [userLogin, setUserLogin] = useState<ILogin>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUserLogin = inputHelper(event, { ...userLogin });
        setUserLogin(updatedUserLogin);
    };

    return (
        <section className='py-5'>
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-5">
                        <div className='bg-white py-3 px-4 rounded-4'>
                            <h3 className='fw-bold'>Lấy lại mật khẩu</h3>
                            <hr />
                            <div className='px-5'>
                                <div>
                                    <Input
                                        label="Nhập email để lấy lại mật khẩu:"
                                        placeholder=""
                                        name='userName'
                                        value={userLogin?.userName || ''}
                                        onChange={() => handleInputChange}
                                    />
                                </div>
                                <div className='mt-3 text-center'>
                                    <button className='btn btn-primary'>Lấy lại mật khẩu</button>
                                    <Link to={'/login'} className='btn btn-outline-dark ms-1'>Đăng nhập</Link>
                                </div>
                                <hr />
                                <div className="alert alert-primary" role="alert">
                                    Đường dẫn đổi lại mật khẩu sẽ được gửi qua email của bạn.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassWord