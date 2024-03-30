import React, { useState, useEffect, useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from '../../components/CustomButton';
import { IRole, IUser, IUserClaims } from './../../interfaces/Interfaces';
import Modal from 'react-modal';
import Input from '../../components/Input';
import inputHelper from '../../helper/InputHelper';
import UserServices from './../../services/User/UserServices';
import { defaultRole, defaultUser } from '../../utilities/DefaultObject';
import Checkbox from './../../components/CheckBox/CheckBox';
import Select from './../../components/Select';
import CustomUserButton from './../../components/CustomUserButton';

const UserManagement = () => {
    const [userList, setUserList] = useState<IUser[]>([]);
    const [roleList, setRoleList] = useState<IRole[]>([]);
    const [user, setUser] = useState<IUser>(defaultUser);
    const [role, setRole] = useState<IRole>(defaultRole);
    const [userClaims, setUserClaims] = useState<IUserClaims[]>([]);
    const [rowData, setRowData] = useState<IUser[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    //error
    const [fullNameError, setFullNameError] = useState<string>('');
    const [userNameError, setUserNameError] = useState<string>('');
    const [userCodeError, setUserCodeError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [roleIdError, setRoleIdError] = useState<string>('');
    const [userIdError, setUserIdError] = useState<string>('');

    useEffect(() => {
        UserServices.getEmployees().then((res) => {
            if (res.isSuccess) {
                setUserList(res.result.users || []);
            }
        })
        UserServices.getRoles().then((res) => {
            if (res.isSuccess) {
                setRoleList(res.result.roles || []);
            }
        })
    }, [isModalOpen, isDelModalOpen]);

    useEffect(() => {
        setRowData(userList.map(user => ({ ...user })));
    }, [userList]);

    const colDefs: ColDef<any>[] = [
        { field: "id", headerName: "STT", width: 70, resizable: false },
        { field: "userCode", headerName: "Mã", width: 130, filter: true, floatingFilter: true, resizable: false },
        { field: "fullName", headerName: "Tên", width: 300, filter: true, floatingFilter: true, resizable: false },
        { field: "email", headerName: "Email", width: 250, filter: true, floatingFilter: true, resizable: false },
        { field: "address", headerName: "Địa chỉ", width: 250, filter: true, floatingFilter: true, resizable: false },
        { field: "role.name", headerName: "Vai trò", width: 120, filter: true, floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thao tác", width: 100, sortable: false, resizable: false,
            cellRenderer: CustomUserButton,
            cellRendererParams: (params: any) => ({
                data: params.data,
                handleOpenModalToUpdate: handleOpenModalToUpdate,
                handleOpenModalToDel: handleOpenModalToDel
            }),
        }
    ];

    const components = useMemo<{
        [p: string]: any;
    }>(() => {
        return {
            CustomButton: CustomButton,
        };
    }, []);

    //pagination
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50, 100];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedUser = inputHelper(event, { ...user });
        setUser(updatedUser);
    };

    const handleRoleChange = (selectedRoleId: string) => {
        const selectedRole = roleList.find(role => role.id === selectedRoleId);
        if (selectedRole) {
            setRole(selectedRole);
            setUser(prevUser => ({ ...prevUser, roleId: selectedRole.id }));
        }
    };

    // Hàm xử lý sự kiện thay đổi của checkbox
    const handleCheckboxChange = (name: string, checked: boolean) => {
        // Kiểm tra xem roleClaims đã được khởi tạo chưa
        if (userClaims !== undefined && userClaims !== null) {
            // Tìm kiếm xem checkbox có tồn tại trong roleClaims hay không
            const index = userClaims.findIndex(state => state.claimType === name);
            if (index !== -1) {
                // Nếu tồn tại, cập nhật trạng thái của checkbox
                const updatedUserClaims = [...userClaims];
                updatedUserClaims[index] = { claimType: name, claimValue: checked ? 'True' : 'False', userId: user.id.toString() };
                setUserClaims(updatedUserClaims);
            } else {
                // Nếu không tồn tại, thêm một phần tử mới vào mảng roleClaims
                setUserClaims(prevState => [...prevState, { claimType: name, claimValue: checked ? 'True' : 'False', userId: user.id.toString() }]);
            }
        }
    };

    //add, update modal
    const handleOpenModalToUpdate = (user: IUser, claims: IUserClaims[]) => {
        // Gán user.role.id vào thuộc tính roleId của user
        const updatedUser = { ...user, roleId: user.role.id };
        setUser(updatedUser);
        setRole(user.role);
        setUserClaims(claims);
        setIsModalOpen(true);
    };

    //del modal
    const handleOpenModalToDel = (user: IUser) => {
        const updatedUser = { ...user, roleId: user.role.id };
        setUser(updatedUser);
        setRole(user.role);
        setIsDelModalOpen(true);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setUser(defaultUser);
        setUserClaims([]);
        setIsModalOpen(false);
        setFullNameError('');
        setUserNameError('');
        setUserCodeError('');
        setEmailError('');
        setRoleIdError('');
        setUserIdError('');
    };

    const handleCloseDelModal = () => {
        setUser(defaultUser)
        setIsDelModalOpen(false);
    };

    // Tạo một danh sách các checkbox dựa trên dữ liệu từ danh sách đã cho
    const checkboxes = [
        { label: 'Xem chứng từ kho', name: 'readWarehouse' },
        { label: 'Thêm sửa xóa chứng từ kho', name: 'modifyWarehouse' },
        { label: 'Xem hàng hóa', name: 'readProduct' },
        { label: 'Thêm sửa xóa hàng hóa', name: 'modifyProduct' },
        { label: 'Xem loại hàng hóa', name: 'readProductType' },
        { label: 'Thêm sửa xóa loại hàng hóa', name: 'modifyProductType' },
        { label: 'Xem chứng từ kiểm kê', name: 'readCheckInventory' },
        { label: 'Thêm sửa xóa chứng từ kiểm kê', name: 'modifyCheckInventory' },
        { label: 'Xem kh/ncc', name: 'readCustomer' },
        { label: 'Thêm sửa xóa kh/ncc', name: 'modifyCustomer' },
    ];

    // Render danh sách các checkbox
    const renderedCheckboxes = checkboxes.map((checkbox, index) => {
        const isChecked = userClaims && userClaims.some(c => c.claimType === checkbox.name && c.claimValue === 'True');
        return (
            <div className="col-6 mb-3" key={index}>
                <Checkbox
                    label={checkbox.label}
                    name={checkbox.name}
                    checked={isChecked || false} // Ensure a default value if userClaims is undefined
                    onChange={(checked: boolean) => handleCheckboxChange(checkbox.name, checked)}
                />
            </div>
        );
    });

    //add User
    const addUser = (
        userName: string,
        passWord: string,
        userCode: string,
        fullName: string,
        email: string,
        phoneNumber: string,
        tax: string,
        address: string,
        roleId: string,
        claims: IUserClaims[]
    ) => {
        UserServices.addUser(
            userName,
            passWord,
            userCode,
            fullName,
            email,
            phoneNumber,
            tax,
            address,
            roleId,
            claims
        ).then((res) => {
            if (res.isSuccess) {
                alert(res.messages);
            } else {
                setFullNameError(res.Fullame);
                setUserNameError(res.UserName);
                setUserCodeError(res.UserCode);
                setEmailError(res.Email);
                setRoleIdError(res.RoleId);
                setUserIdError(res.UserId);
            }
        })
    }


    //update User
    const updateUser = (
        id: string,
        userCode: string,
        fullName: string,
        email: string,
        phoneNumber: string,
        tax: string,
        address: string,
        roleId: string,
        claims: IUserClaims[]
    ) => {
        UserServices.updateUser(
            id,
            userCode,
            fullName,
            email,
            phoneNumber,
            tax,
            address,
            roleId,
            claims
        ).then((res) => {
            if (res.isSuccess) {
                alert(res.messages);
            } else {
                setFullNameError(res.Fullame);
                setUserNameError(res.UserName);
                setUserCodeError(res.UserCode);
                setEmailError(res.Email);
                setRoleIdError(res.RoleId);
                setUserIdError(res.UserId);
            }
        })
    }

    //update RolUsere
    const deleteUser = (id: string) => {
        UserServices.deleteUser(id).then((res) => {
            if (res.isSuccess) {
                alert(res.messages);
                handleCloseDelModal();
            } else {
                setUserIdError(res.UserId);
            }
        })
    }

    return (
        <section>
            <div className='bg-white p-3'>
                <div className="row">
                    <div className="col">
                        <h3 className='fw-bold'>Quản lý người dùng</h3>
                    </div>
                    <div className="col text-end px-4">
                        <button className='btn btn-primary'
                            onClick={handleOpenModal}
                        >Thêm mới</button>
                    </div>
                </div>
                <hr />
                <div className="ag-theme-quartz" style={{ height: 500 }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        rowSelection={'single'}
                        components={components}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                    />
                </div>
            </div>
            {/* add/update modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                style={{
                    content: {
                        width: '1300px',
                        height: '600px',
                        left: '8%',
                    },
                }}
                ariaHideApp={false}
            >
                <div>
                    <div className="modal-header border-bottom pb-3">
                        <h1 className="modal-title fs-5">{user?.id !== '' ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}</h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4">
                                            <Input
                                                label="Mã:"
                                                placeholder=""
                                                name='userCode'
                                                type='text'
                                                value={user?.userCode || ''}
                                                row={1}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            {userCodeError !== '' ? <span className='text-danger'>{userCodeError}</span> : ''}
                                        </div>
                                        <div className="col">
                                            <Input
                                                label="Điện thoại:"
                                                placeholder=""
                                                name='phoneNumber'
                                                type='text'
                                                value={user?.phoneNumber || ''}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                        <div className="col">
                                            <Select
                                                label="Chọn vai trò:"
                                                options={roleList.map(r => ({
                                                    value: r.id,
                                                    label: r.name
                                                }))}
                                                value={user.roleId || ''}
                                                name="roleId"
                                                onChange={(e) => handleRoleChange(e.target.value)}
                                            />
                                            {roleIdError !== '' ? <span className='text-danger'>{roleIdError}</span> : ''}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <Input
                                                label="Tài khoản:"
                                                placeholder=""
                                                name='userName'
                                                type='text'
                                                value={user?.userName || ''}
                                                onChange={(e) => handleInputChange(e)}
                                                disable={user.id !== '' ? true : false}
                                            />
                                            {userNameError !== '' ? <span className='text-danger'>{userNameError}</span> : ''}
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                label="Tên:"
                                                placeholder=""
                                                name='fullName'
                                                type='text'
                                                value={user?.fullName || ''}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            {fullNameError !== '' ? <span className='text-danger'>{fullNameError}</span> : ''}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <Input
                                                label="Mật khẩu:"
                                                placeholder=""
                                                name='password'
                                                type='text'
                                                value={user?.password || ''}
                                                onChange={(e) => handleInputChange(e)}
                                                hidden={user.id !== '' ? true : false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <Input
                                                label="Email:"
                                                placeholder=""
                                                name='email'
                                                type='text'
                                                value={user?.email || ''}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            {emailError !== '' ? <span className='text-danger'>{emailError}</span> : ''}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <Input
                                                label="Địa chỉ:"
                                                placeholder=""
                                                name='address'
                                                type='text'
                                                value={user?.address || ''}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                label="Mã số thuế:"
                                                placeholder=""
                                                name='tax'
                                                type='text'
                                                value={user?.tax || ''}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="container">
                                        <div className="row">
                                            <h6 className='mb-3 fw-bold'>Phân quyền chi tiết cho người dùng:</h6>
                                            <hr />
                                            {renderedCheckboxes}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseModal}>Đóng</button>
                        {user?.id !== '' ?
                            <button type="button" className="btn btn-warning w-25 rounded-2 ms-1"
                                onClick={() => updateUser(user.id || '', user.userCode || '', user.fullName || '', user.email || '', user.phoneNumber || '', user.tax || '', user.address || '', user.roleId || '', userClaims)}
                            >Lưu</button>
                            :
                            <button type="button" className="btn btn-success w-25 rounded-2 ms-1"
                                onClick={() => addUser(user.userName || '', user.password || '', user.userCode || '', user.fullName || '', user.email || '', user.phoneNumber || '', user.tax || '', user.address || '', user.roleId || '', userClaims)}
                            >Tạo</button>
                        }
                    </div>
                </div>
            </Modal>
            {/* delete modal */}
            <Modal
                isOpen={isDelModalOpen}
                onRequestClose={handleCloseDelModal}
                style={{
                    content: {
                        width: '600px',
                        height: '220px',
                        left: '35%',
                    },
                }}
                ariaHideApp={false}
            >
                <div>
                    <div className="modal-header border-bottom pb-3">
                        <h1 className="modal-title fs-5">Xóa</h1>
                        <button type="button" className="btn-close" onClick={handleCloseDelModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        Bạn có chắc muốn xóa <span className='fw-bold'>{user?.userCode}</span>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                        <button type="button" className="btn btn-danger w-25 rounded-2 ms-1"
                            onClick={() => deleteUser(user.id || '')}
                        >Xóa</button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default UserManagement