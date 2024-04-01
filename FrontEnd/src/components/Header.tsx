import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { IUserModel } from '../interfaces/Interfaces';
import { RootState } from '../storage/Redux/store';
import { emptyUserState, setLoggedInUser } from './../storage/Redux/userAuthSlice';
import { Role_Admin } from './../utilities/SD';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //userData
    const userData: IUserModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    //logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate("/login");
    };


    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-header-green">
                <div className="container-fluid">
                    <Link to={""} className="navbar-brand text-white fw-bold" >Quản lý kho</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item border m-1">
                                <Link to={""} className="nav-link text-white nav-hover" aria-current="page"><i className="bi bi-eye-fill me-1"></i>Tổng quan</Link>
                            </li>
                            <li className="nav-item border m-1">
                                <Link to={"inWarehouse"} className="nav-link text-white nav-hover"><i className="bi bi-archive-fill me-1"></i>Kho</Link>
                            </li>
                            <li className="nav-item border m-1">
                                <Link to={"allCustomer"} className="nav-link text-white nav-hover"><i className="bi bi-people-fill me-1"></i>KH/NCC</Link>
                            </li>
                            <li className="nav-item dropdown border m-1">
                                <Link to={"/inventoryReport"} className="nav-link dropdown-toggle text-white nav-hover" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-file-text-fill me-1"></i>Báo cáo
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link to={"inventoryReport"} className="dropdown-item" >Tồn kho</Link></li>
                                    <li><Link to={"inOutReport"} className="dropdown-item" >Xuất nhập tồn</Link></li>
                                    <li><Link to={"revenueReport"} className="dropdown-item" >Doanh thu</Link></li>
                                    <li><Link to={"customerRevenueReport"} className="dropdown-item" >Doanh thu theo KH/NCC</Link></li>

                                </ul>
                            </li>
                            {userData.role === Role_Admin ? (<>
                                <li className="nav-item border m-1">
                                    <Link to={"userManagement"} className="nav-link text-white nav-hover"><i className="bi bi-person-circle me-1"></i>Quản trị</Link>
                                </li>
                            </>) : null}
                        </ul>
                    </div>
                </div>

                <div className="dropdown m-1 p-2 nav-hover me-5">
                    <Link to={""} className="nav-link dropdown-toggle text-white " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={`https://ui-avatars.com/api/?name=${userData.fullName}`} alt="Huỳnh Trung Nghĩa" className='rounded-5 me-2' style={{ width: "30px" }} />
                        {userData.fullName}
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to={"/accountInfor"} className="dropdown-item" >Thông tin</Link></li>
                        <li><button className="dropdown-item"
                            onClick={handleLogout}
                        >Đăng xuất</button></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header