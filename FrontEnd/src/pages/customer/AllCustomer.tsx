import React, { useState, useEffect, useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from '../../components/CustomButton';
import { ICustomer, IUserModel } from './../../interfaces/Interfaces';
import Input from './../../components/Input';
import Modal from 'react-modal';
import inputHelper from '../../helper/InputHelper';
import CustomerServices from './../../services/Customer/CustomerServices';
import UsefulFunctions from './../../utilities/UsefulFunctions';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage/Redux/store';

const defaultCustomer: ICustomer = {
    id: 0,
    customerCode: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    tax: '',
};

const AllCustomer = () => {
    const userData: IUserModel = useSelector(
        (state: RootState) => state.userAuthStore
    );


    const [customerList, setCustomerList] = useState<ICustomer[]>([]);
    const [customer, setCustomer] = useState<ICustomer>(defaultCustomer);
    const [rowData, setRowData] = useState<ICustomer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    //errors
    const [customerCodeError, setCustomerCodeError] = useState<string>('');


    useEffect(() => {
        CustomerServices.getCustomers().then((res) => {
            if (res.isSuccess) {
                setCustomerList(res.result.customers || [])
            }
        })
    }, [isModalOpen, isDelModalOpen]);

    useEffect(() => {
        setRowData(customerList.map(customer => ({ ...customer })));
    }, [customerList]);

    const colDefs: ColDef<any>[] = [
        { field: "id", headerName: "STT", width: 70, resizable: false },
        { field: "customerCode", headerName: "Mã", width: 150, filter: true, floatingFilter: true, resizable: false },
        { field: "name", headerName: "Tên", width: 300, filter: true, floatingFilter: true, resizable: false },
        { field: "phone", headerName: "SDT", width: 150, filter: true, floatingFilter: true, resizable: false },
        { field: "tax", headerName: "MST", width: 150, filter: true, floatingFilter: true, resizable: false },
        { field: "address", headerName: "Địa chỉ", width: 230, filter: true, floatingFilter: true, resizable: false },
        { field: "email", headerName: "Email", width: 300, filter: true, floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thao tác", width: 150, sortable: false, resizable: false,
            cellRenderer: CustomButton,
            cellRendererParams: (params: any) => ({
                data: params.data,
                item: UsefulFunctions.findItemById(customerList, params.data.id),
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

    //input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCustomer = inputHelper(event, { ...customer });
        setCustomer(updatedCustomer);
    };

    //add, update modal
    const handleOpenModalToUpdate = (customer: ICustomer) => {
        setCustomer(customer);
        setIsModalOpen(true);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCustomer(defaultCustomer);
        setCustomerCodeError('');
    };

    //del modal
    const handleOpenModalToDel = (customer: ICustomer) => {
        setCustomer(customer);
        setIsDelModalOpen(true);
    };
    const handleCloseDelModal = () => {
        setIsDelModalOpen(false);
        setCustomer(defaultCustomer);
    };

    //add Customer
    const addCustomer = (customerCode: string, name: string, email: string, phone: string, address: string, tax: string) => {
        console.log(customer);
        CustomerServices.addCustomer(customerCode, name, email, phone, address, tax).then((res) => {
            if (res.isSuccess) {
                handleCloseModal();
            } else {
                setCustomerCodeError(res.CustomerCode);
            }
        })
    }

    //update Customer
    const updateCustomer = (id: number, customerCode: string, name: string, email: string, phone: string, address: string, tax: string) => {
        CustomerServices.updateCustomer(id, customerCode, name, email, phone, address, tax).then((res) => {
            if (res.isSuccess) {
                alert("Cập nhật thành công");
            } else {
                setCustomerCodeError(res.CustomerCode);
            }
        })
    }

    //delete Customer
    const deleteCustomer = (id: number) => {
        CustomerServices.deleteCustomer(id).then((res) => {
            if (res.isSuccess) {
                handleCloseDelModal();
            } else {
                alert(res.Id);
            }
        })
    }

    const ModalHeight = () => {
        if (userData.modifyCustomer !== "True") {
            return '550px';
        } else {
            return '500px';
        }
    }
    const DelModalHeight = () => {
        if (userData.modifyProductType !== "True") {
            return '280px';
        } else {
            return '240px';
        }
    }

    return (
        <section>
            <div className='bg-white p-3'>
                <div className="row">
                    <div className="col">
                        <h3 className='fw-bold'>Quản lý khách hàng/nhà cung cấp</h3>
                    </div>
                    <div className="col text-end px-4">
                        <button className='btn btn-primary' onClick={handleOpenModal}>Thêm mới</button>
                        <button className='btn btn-primary ms-1'>Xuất file</button>
                        <button className='btn btn-primary ms-1'>Nhập file</button>
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
                        height: ModalHeight(),
                        left: '30%',
                    },
                }}
                ariaHideApp={false}
            >
                <div>
                    <div className="modal-header border-bottom pb-3">
                        <h1 className="modal-title fs-5">{customer.id !== 0 ? 'Cập nhật KH/NCC' : 'Thêm mới KH/NCC'}</h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        <div className="container">
                            {userData.modifyCustomer !== "True" ? (<>
                                <div className="alert alert-danger" role="alert">
                                    Bạn không có quyền chỉnh sửa, thêm
                                </div>
                            </>) : null}
                            <div className="row">
                                <div className="col-4">
                                    <Input
                                        label="Mã:"
                                        placeholder="Nhập mã"
                                        name='customerCode'
                                        type='text'
                                        value={customer?.customerCode || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {customerCodeError !== '' ? <span className='text-danger'>{customerCodeError}</span> : ''}
                                </div>
                                <div className="col">
                                    <Input
                                        label="Tên kh/ncc:"
                                        placeholder="Nhập Tên kh/ncc"
                                        name='name'
                                        type='text'
                                        value={customer?.name || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-4">
                                    <Input
                                        label="Tax:"
                                        placeholder="Nhập mã số thuế"
                                        name='tax'
                                        type='text'
                                        value={customer?.tax || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                                <div className="col">
                                    <Input
                                        label="Email:"
                                        placeholder="Nhập email"
                                        name='email'
                                        type='text'
                                        value={customer?.email || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <Input
                                        label="Số điện thoại:"
                                        placeholder="Nhập số điện thoại"
                                        name='phone'
                                        type='text'
                                        value={customer?.phone || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <Input
                                        label="Địa chỉ:"
                                        placeholder="Nhập địa chỉ"
                                        name='address'
                                        type='text'
                                        value={customer?.address || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseModal}>Đóng</button>
                        {userData.modifyCustomer === "True" ? (
                            <>
                                {customer.id !== 0 ?
                                    <button type="button" className="btn btn-warning w-25 rounded-2 ms-1"
                                        onClick={() => updateCustomer(customer.id,
                                            customer?.customerCode || '',
                                            customer?.name || '',
                                            customer?.email || '',
                                            customer?.phone || '',
                                            customer?.address || '',
                                            customer?.tax || '')}
                                    >Lưu</button>
                                    :
                                    <button type="button" className="btn btn-success w-25 rounded-2 ms-1"
                                        onClick={() =>
                                            addCustomer(customer?.customerCode || '',
                                                customer?.name || '',
                                                customer?.email || '',
                                                customer?.phone || '',
                                                customer?.address || '',
                                                customer?.tax || '')}
                                    >Tạo</button>
                                }
                            </>
                        ) : null}
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
                        height: DelModalHeight(),
                        left: '35%',
                    },
                }}
                ariaHideApp={false}
            >
                {userData.modifyCustomer === "True" ? (<>
                    <div>
                        <div className="modal-header border-bottom pb-3">
                            <h1 className="modal-title fs-5">Xóa</h1>
                            <button type="button" className="btn-close" onClick={handleCloseDelModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-4">
                            Bạn có chắc muốn xóa <span className='fw-bold'>{customer.name}</span>
                        </div>
                        <div className="modal-footer border-top pt-3">
                            <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                            <button onClick={() => deleteCustomer(customer.id)} type="button" className="btn btn-danger w-25 rounded-2 ms-1">Xóa</button>
                        </div>
                    </div>
                </>) :
                    (
                        <div>
                            <div className="modal-header border-bottom pb-3">
                                <h1 className="modal-title fs-5">Xóa</h1>
                                <button type="button" className="btn-close" onClick={handleCloseDelModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-4">
                                <div className="alert alert-danger" role="alert">
                                    Bạn không có quyền xóa khách hàng/nhà cung cấp
                                </div>
                            </div>
                            <div className="modal-footer border-top pt-3">
                                <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                            </div>
                        </div>
                    )
                }

            </Modal>
        </section>
    );
}

export default AllCustomer;
