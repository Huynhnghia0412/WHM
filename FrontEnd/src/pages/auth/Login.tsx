import React, { useState } from 'react'
import Input from '../../components/Input'
import { ILogin, IUserModel } from './../../interfaces/Interfaces';
import inputHelper from '../../helper/InputHelper';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from './../../services/Auth/AuthServices';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../storage/Redux/userAuthSlice';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [userLogin, setUserLogin] = useState<ILogin>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //error
    const [passwordError, setPasswordError] = useState<string>('');
    const [userNameError, setUserNameError] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUserLogin = inputHelper(event, { ...userLogin });
        setUserLogin(updatedUserLogin);
        setUserNameError('');
        setPasswordError('');
    };

    //add User
    const login = (username: string, password: string) => {
        AuthServices.login(username, password).then((res) => {
            if (res.isSuccess) {
                const token = res.result.token;
                const { fullName, id, email, role,
                    readInOutNote,
                    modifyInOutNote,
                    readWarehouse,
                    modifyWarehouse,
                    readProduct,
                    modifyProduct,
                    readProductType,
                    modifyProductType,
                    readCheckInventory,
                    modifyCheckInventory,
                    readCustomer,
                    modifyCustomer, }: IUserModel = jwtDecode(token);
                localStorage.setItem("token", token);
                dispatch(setLoggedInUser(setLoggedInUser(
                    {
                        fullName, id, email, role,
                        readInOutNote,
                        modifyInOutNote,
                        readWarehouse,
                        modifyWarehouse,
                        readProduct,
                        modifyProduct,
                        readProductType,
                        modifyProductType,
                        readCheckInventory,
                        modifyCheckInventory,
                        readCustomer,
                        modifyCustomer,
                    }
                )));
                navigate("/");
            } else {
                setUserNameError(res.Username);
                setPasswordError(res.Password);
            }
        })
    }

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
                                        name='username'
                                        value={userLogin?.username || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {userNameError !== '' ? <span className='text-danger'>{userNameError}</span> : ''}
                                </div>
                                <div className='mt-3'>
                                    <Input
                                        label="Mật khẩu:"
                                        placeholder=""
                                        name='password'
                                        type='password'
                                        value={userLogin?.password || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {passwordError !== '' ? <span className='text-danger'>{passwordError}</span> : ''}
                                </div>
                                <div className='mt-3 text-center'>
                                    <button className='btn btn-primary'
                                        onClick={() => login(userLogin?.username || '', userLogin?.password || '')}
                                    >Đăng nhập</button>
                                </div>
                                <hr />
                                <div>
                                    <Link to={'/sendEmail'}>Quên mật khẩu?</Link>
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