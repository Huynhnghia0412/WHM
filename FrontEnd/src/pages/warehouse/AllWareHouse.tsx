import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IUser, IWareHouse } from '../../interfaces/Interfaces';
import { ColDef } from 'ag-grid-community';
import CustomButton from '../../components/CustomButton';
import UsefulFunctions from './../../utilities/UsefulFunctions';
import inputHelper from './../../helper/InputHelper';
import WareHouseServices from '../../services/WareHouse/WareHouseServices';
import { AgGridReact } from 'ag-grid-react';
import Input from './../../components/Input';
import Select from './../../components/Select';
import UserServices from './../../services/User/UserServices';

const defaultWareHouse: IWareHouse = {
    id: 0,
    name: '',
    userId: '',
    email: ''
};


const AllWareHouse = () => {
    const [wareHouseList, setWareHouseList] = useState<IWareHouse[]>([]);
    const [employeeList, setEmployeeList] = useState<IUser[]>([]);
    const [wareHouse, setWareHouse] = useState<IWareHouse>(defaultWareHouse);
    const [rowData, setRowData] = useState<IWareHouse[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    //errors
    const [nameError, setNameError] = useState<string>('');
    const [userIdError, setUserIdError] = useState<string>('');

    console.log(wareHouse)

    useEffect(() => {
        WareHouseServices.getWareHouses().then((res) => {
            if (res.isSuccess) {
                setWareHouseList(res.result.wareHouses || [])
            }
        })

        UserServices.getEmployees().then((res) => {
            if (res.isSuccess) {
                setEmployeeList(res.result.users || [])
            }
        })
    }, [isModalOpen, isDelModalOpen]);

    useEffect(() => {
        setRowData(wareHouseList.map(wareHouse => ({ ...wareHouse })));
    }, [wareHouseList]);

    const colDefs: ColDef<any>[] = [
        { field: "id", headerName: "STT", width: 100, resizable: false },
        { field: "name", headerName: "Tên kho", width: 500, filter: true, floatingFilter: true, resizable: false },
        { field: "email", headerName: "Quản kho", width: 470, filter: true, floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thao tác", width: 150, sortable: false, resizable: false,
            cellRenderer: CustomButton,
            cellRendererParams: (params: any) => ({
                data: params.data,
                item: UsefulFunctions.findItemById(wareHouseList, params.data.id),
                handleOpenModalToUpdate: handleOpenModalToUpdate,
                handleOpenModalToDel: handleOpenModalToDel
            }),
        }
    ];

    //pagination
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50, 100];

    //input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedWareHouse = inputHelper(event, { ...wareHouse });
        setWareHouse(updatedWareHouse);
    };

    //add, update modal
    const handleOpenModalToUpdate = (wareHouse: IWareHouse) => {
        setWareHouse(wareHouse);
        setIsModalOpen(true);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setWareHouse(defaultWareHouse);
        setNameError('');
        setUserIdError('');
    };

    //del modal
    const handleOpenModalToDel = (wareHouse: IWareHouse) => {
        setWareHouse(wareHouse);
        setIsDelModalOpen(true);
    };
    const handleCloseDelModal = () => {
        setIsDelModalOpen(false);
        setWareHouse(defaultWareHouse);
    };

    //add WareHouse
    const addWareHouse = (name: string, userId: string) => {
        WareHouseServices.addWareHouse(name, userId).then((res) => {
            if (res.isSuccess) {
                handleCloseModal();
            } else {
                setNameError(res.Name);
                setUserIdError(res.UserId);
            }
        })
    }

    //update WareHouse
    const updateWareHouse = (id: number, name: string, userId: string) => {
        WareHouseServices.updateWareHouse(id, name, userId).then((res) => {
            if (res.isSuccess) {
                alert("Cập nhật thành công");
            } else {
                setNameError(res.Name);
                setUserIdError(res.UserId);
            }
        })
    }

    //delete WareHouse
    const deleteWareHouse = (id: number) => {
        WareHouseServices.deleteWareHouse(id).then((res) => {
            if (res.isSuccess) {
                handleCloseDelModal();
            } else {
                alert(res.Id);
            }
        })
    }

    return (
        <div className='bg-white p-3'>
            <div className="row">
                <div className="col">
                    <h3 className='fw-bold'>Kho</h3>
                </div>
                <div className="col text-end px-4">
                    <button className='btn btn-primary fw-bold' onClick={handleOpenModal}><i className="bi bi-plus-circle-dotted me-1"></i>Thêm mới</button>
                </div>
            </div>
            <hr />
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection={'single'}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
            {/* add/update modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                style={{
                    content: {
                        width: '600px',
                        height: '360px',
                        left: '35%',
                    },
                }}
                ariaHideApp={false}
            >
                <div>
                    <div className="modal-header border-bottom pb-3">
                        <h1 className="modal-title fs-5">{wareHouse.id !== 0 ? 'Cập nhật kho' : 'Thêm mới kho'}</h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Input
                                        label="Tên kho:"
                                        placeholder="Nhập tên kho"
                                        name='name'
                                        type='text'
                                        value={wareHouse?.name || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {nameError !== '' ? <span className='text-danger'>{nameError}</span> : ''}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <Select
                                        label="Chọn người quản kho:"
                                        options={employeeList.map(employee => ({
                                            value: employee.id.toString(),
                                            label: employee.email
                                        }))}
                                        value={wareHouse.userId}
                                        name="userId"
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {userIdError !== '' ? <span className='text-danger'>{userIdError}</span> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseModal}>Đóng</button>
                        {wareHouse.id !== 0 ?
                            <button type="button" className="btn btn-warning w-25 rounded-2 ms-1"
                                onClick={() => updateWareHouse(wareHouse.id,
                                    wareHouse?.name || '',
                                    wareHouse?.userId || '')}
                            >Lưu</button>
                            :
                            <button type="button" className="btn btn-success w-25 rounded-2 ms-1"
                                onClick={() =>
                                    addWareHouse(
                                        wareHouse?.name || '',
                                        wareHouse?.userId || '')}
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
                        Bạn có chắc muốn xóa kho <span className='fw-bold'>{wareHouse.name}</span>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                        <button onClick={() => deleteWareHouse(wareHouse.id)} type="button" className="btn btn-danger w-25 rounded-2 ms-1">Xóa</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AllWareHouse