import React, { useState, useEffect } from 'react'
import Input from '../../components/Input'
import { Link, useLocation } from 'react-router-dom';
import AuthServices from '../../services/Auth/AuthServices';
import MiniLoader from './../../components/Loader/MiniLoader';

const ChangePassword = () => {
    const location = useLocation();
    const [userId, setUserId] = useState<string>('');
    const [resetToken, setResetToken] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>('');
    //error
    const [passwordError, setPasswordError] = useState<string>('');

    useEffect(() => {
        // Lấy chuỗi truy vấn từ URL
        const queryString = window.location.search;
        // Thay thế khoảng trắng bằng dấu cộng trong chuỗi truy vấn
        // Tạo một đối tượng URLSearchParams để phân tích các tham số truy vấn
        const searchParams = new URLSearchParams(queryString);
        // Lấy giá trị userId từ query string
        const userIdFromUrl = searchParams.get('userId')?.trim();
        // Lấy giá trị resetToken từ query string
        const resetTokenFromUrl = searchParams.get('resetToken')?.trim();
        const resetToken = resetTokenFromUrl?.replace(/ /g, '+');

        // Cập nhật state với giá trị từ URL
        setUserId(userIdFromUrl || '');
        setResetToken(resetToken || '');
    }, []);
    console.log(resetToken)


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    //add User
    const changePassword = (userId: string, password: string, resetToken: string) => {
        setMessage('');
        setPasswordError('');
        setIsLoading(true)
        AuthServices.changePassword(userId, password, resetToken).then((res) => {
            if (res.isSuccess) {
                setPasswordError('');
                setIsLoading(false)
                setMessage(res.messages);
            } else {
                setIsLoading(false)
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
                            <h3 className='fw-bold'>Đổi mật khẩu</h3>
                            <hr />
                            <div className='px-5'>
                                <div>
                                    <Input
                                        label="Mật khẩu mới:"
                                        placeholder=""
                                        name='password'
                                        value={password || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {passwordError !== '' ? <span className='text-danger'>{passwordError}</span> : ''}
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
                                        onClick={() => changePassword(
                                            userId || '',
                                            password || '',
                                            resetToken || '')}
                                    >Đổi mật khẩu</button>
                                </div>
                                <hr />
                                <div>
                                    <Link to={'/login'}>Đăng nhập?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword