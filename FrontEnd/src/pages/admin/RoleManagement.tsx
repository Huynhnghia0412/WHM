import React, { useState, useEffect, useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from '../../components/CustomButton';
import { IRole, IRoleClaims } from './../../interfaces/Interfaces';
import Modal from 'react-modal';
import Input from './../../components/Input';
import inputHelper from '../../helper/InputHelper';
import { defaultRole } from '../../utilities/DefaultObject';
import Checkbox from '../../components/CheckBox/CheckBox';
import UserServices from './../../services/User/UserServices';
import CustomRoleButton from './../../components/CustomRoleButton';

const RoleManagement = () => {
    const [roleList, setRoleList] = useState<IRole[]>([]);
    const [role, setRole] = useState<IRole>(defaultRole);
    const [roleClaims, setRoleClaims] = useState<IRoleClaims[]>([]);
    const [rowData, setRowData] = useState<IRole[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    //error
    const [nameError, setNameError] = useState<string>('');

    useEffect(() => {
        UserServices.getRolesInCludeClaims().then((res) => {
            if (res.isSuccess) {
                setRoleList(res.result.roles || []);
                // Chỉ gán dữ liệu mới nếu dữ liệu từ API không rỗng
                if (res.result.RoleClaims) {
                    setRoleClaims(res.result.RoleClaims);
                }
            }
        })
    }, [isModalOpen, isDelModalOpen]);

    useEffect(() => {
        setRowData(roleList.map(role => ({ ...role })));
    }, [roleList]);

    const colDefs: ColDef<any>[] = [
        { field: "role.id", headerName: "STT", width: 150, resizable: false },
        { field: "role.name", headerName: "Tên", width: 700, filter: true, floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thao tác", width: 300, sortable: false, resizable: false,
            cellRenderer: CustomRoleButton,
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedRole = inputHelper(event, { ...role });
        setRole(updatedRole);
    };

    // Hàm xử lý sự kiện thay đổi của checkbox
    const handleCheckboxChange = (name: string, checked: boolean) => {
        // Kiểm tra xem roleClaims đã được khởi tạo chưa
        if (roleClaims !== undefined && roleClaims !== null) {
            // Tìm kiếm xem checkbox có tồn tại trong roleClaims hay không
            const index = roleClaims.findIndex(state => state.claimType === name);
            if (index !== -1) {
                // Nếu tồn tại, cập nhật trạng thái của checkbox
                const updatedRoleClaims = [...roleClaims];
                updatedRoleClaims[index] = { claimType: name, claimValue: checked ? 'True' : 'False', roleId: role.id.toString() };
                setRoleClaims(updatedRoleClaims);
            } else {
                // Nếu không tồn tại, thêm một phần tử mới vào mảng roleClaims
                setRoleClaims(prevState => [...prevState, { claimType: name, claimValue: checked ? 'True' : 'False', roleId: role.id.toString() }]);
            }
        }
    };

    //add, update modal
    const handleOpenModalToUpdate = (role: IRole, claims: IRoleClaims[]) => {
        setRole(role);
        setRoleClaims(claims);
        setIsModalOpen(true);
    };

    //del modal
    const handleOpenModalToDel = (role: IRole) => {
        setRole(role);
        setIsDelModalOpen(true);
    };
    console.log(role)


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setRole(defaultRole)
        setRoleClaims([])
        setIsModalOpen(false);
    };

    const handleCloseDelModal = () => {
        setRole(defaultRole)
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
    const renderedCheckboxes = roleClaims ? checkboxes.map((checkbox, index) => {
        const isChecked = roleClaims.some(c => c.claimType === checkbox.name && c.claimValue === 'True');
        return (
            <div className="col-6 mb-2" key={index}>
                <Checkbox
                    label={checkbox.label}
                    name={checkbox.name}
                    checked={isChecked}
                    onChange={(checked: boolean) => handleCheckboxChange(checkbox.name, checked)}
                />
            </div>
        );
    }) : null;


    //add Role
    const addRole = (name: string, claims: IRoleClaims[]) => {
        UserServices.addRole(name, claims).then((res) => {
            if (res.isSuccess) {
                alert(res.messages);
            } else {
                setNameError(res.Name);
            }
        })
    }

    //update Role
    const updateRole = (id: string, name: string, claims: IRoleClaims[]) => {
        UserServices.updateRole(id, name, claims).then((res) => {
            if (res.isSuccess) {
                alert(res.messages);
            } else {
                setNameError(res.Name);
            }
        })
    }

    //update Role
    const deleteRole = (id: string) => {
        UserServices.deleteRole(id).then((res) => {
            if (res.isSuccess) {
                alert(res.messages);
                handleCloseDelModal();
            } else {
                setNameError(res.Name);
            }
        })
    }

    return (
        <section>
            <div className='bg-white p-3'>
                <div className="row">
                    <div className="col">
                        <h3 className='fw-bold'>Quản lý vai trò</h3>
                    </div>
                    <div className="col text-end px-4">
                        <button onClick={handleOpenModal} className='btn btn-primary'>Thêm mới</button>
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
                        width: '600px',
                        height: '500px',
                        left: '35%',
                    },
                }}
                ariaHideApp={false}
            >
                <div>
                    <div className="modal-header border-bottom pb-3">
                        <h1 className="modal-title fs-5">{role?.id !== '' ? 'Cập nhật vai trò' : 'Thêm mới vai trò'}</h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Input
                                        label="Tên vai trò:"
                                        placeholder=""
                                        name='name'
                                        type='text'
                                        value={role?.name || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <hr />
                            <h6 className='fw-bold'>Phân quyền cho vài trò:</h6>
                            <div className="row mt-3">
                                {renderedCheckboxes}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseModal}>Đóng</button>
                        {role?.id !== '' ?
                            <button type="button" className="btn btn-warning w-25 rounded-2 ms-1"
                                onClick={() => updateRole(role.id || '', role.name || '', roleClaims || [])}
                            >Lưu</button>
                            :
                            <button type="button" className="btn btn-success w-25 rounded-2 ms-1"
                                onClick={() => addRole(role.name || '', roleClaims || [])}
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
                        Bạn có chắc muốn xóa <span className='fw-bold'>{role?.name}</span>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                        <button type="button" className="btn btn-danger w-25 rounded-2 ms-1"
                            onClick={() => deleteRole(role.id || '')}
                        >Xóa</button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default RoleManagement