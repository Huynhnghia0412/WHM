import React, { useState } from 'react'
import Input from '../../components/Input'
import { ILogin } from './../../interfaces/Interfaces';
import inputHelper from '../../helper/InputHelper';
import { Link } from 'react-router-dom';

const Login = () => {
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
                            <h3 className='fw-bold'>Đăng nhập</h3>
                            <hr />
                            <div className='px-5'>
                                <div>
                                    <Input
                                        label="Tài khoản:"
                                        placeholder=""
                                        name='userName'
                                        value={userLogin?.userName || ''}
                                        onChange={() => handleInputChange}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <Input
                                        label="Mật khẩu:"
                                        placeholder=""
                                        name='passWord'
                                        type='password'
                                        value={userLogin?.passWord || ''}
                                        onChange={() => handleInputChange}
                                    />
                                </div>
                                <div className='mt-3 text-center'>
                                    <Link to={'/inWarehouse'} className='btn btn-primary'>Đăng nhập</Link>
                                </div>
                                <hr />
                                <div>
                                    <Link to={'/resetPassWord'}>Quên mật khẩu?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default Login