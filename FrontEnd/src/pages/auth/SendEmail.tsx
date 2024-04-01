import React, { useState } from 'react'
import Input from '../../components/Input'
import { Link } from 'react-router-dom';
import AuthServices from './../../services/Auth/AuthServices';
import MiniLoader from './../../components/Loader/MiniLoader';

const SendEmail = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [loading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // SendEmail
    const sendEmail = (email: string) => {
        setMessage('')
        setEmailError('');
        setIsLoading(true)
        AuthServices.sendEmail(email).then((res) => {
            if (res.isSuccess) {
                setEmailError('');
                setIsLoading(false)
                setMessage(res.messages);
            } else {
                setIsLoading(false)
                setEmailError(res.Email);
            }
        })
    }

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
                                        name='email'
                                        value={email || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {emailError !== '' ? <span className='text-danger'>{emailError}</span> : ''}
                                </div>
                                {loading ?
                                    <div className='text-center mt-3'>
                                        <MiniLoader type="warning" size="100" />
                                    </div> : null
                                }

                                {message !== '' ?
                                    <p className='text-success text-center my-2'>{message}</p>
                                    : ''}
                                <div className='mt-3 text-center'>
                                    <button className='btn btn-primary'
                                        onClick={() => sendEmail(email || '')}
                                    >Lấy lại mật khẩu</button>
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

export default SendEmail