import React, { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from '../../components/CustomButton';
import { IProductType, IUserModel } from './../../interfaces/Interfaces';
import Input from './../../components/Input';
import Modal from 'react-modal';
import inputHelper from '../../helper/InputHelper';
import ProductTypeServices from '../../services/ProductType/ProductTypeServices';
import UsefulFunctions from './../../utilities/UsefulFunctions';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage/Redux/store';

const defaultProductType: IProductType = {
    id: 0,
    productTypeCode: '',
    name: '',
    detail: ''
};

const ProductType = () => {
    const userData: IUserModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    const [productTypeList, setProductTypeList] = useState<IProductType[]>([]);
    const [productType, setProductType] = useState<IProductType>(defaultProductType);
    const [rowData, setRowData] = useState<IProductType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    //errors
    const [productTypeCodeError, setProductTypeCodeError] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

    useEffect(() => {
        ProductTypeServices.getProductTypes().then((res) => {
            if (res.isSuccess) {
                setProductTypeList(res.result.productTypes || [])
            }
        })
    }, [isModalOpen, isDelModalOpen]);

    useEffect(() => {
        setRowData(productTypeList.map(productType => ({ ...productType })));
    }, [productTypeList]);

    const colDefs: ColDef<any>[] = [
        { field: "id", headerName: "STT", width: 70, resizable: false },
        { field: "productTypeCode", headerName: "Mã", width: 200, filter: true, floatingFilter: true, resizable: false },
        { field: "name", headerName: "Tên", width: 400, filter: true, floatingFilter: true, resizable: false },
        { field: "detail", headerName: "Ghi chú", width: 400, filter: true, floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thao tác", width: 150, sortable: false, resizable: false,
            cellRenderer: CustomButton,
            cellRendererParams: (params: any) => ({
                data: params.data,
                item: UsefulFunctions.findItemById(productTypeList, params.data.id),
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
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedProductType = inputHelper(event, { ...productType });
        setProductType(updatedProductType);
    };

    //add, update modal
    const handleOpenModalToUpdate = (productType: IProductType) => {
        setProductType(productType);
        setIsModalOpen(true);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProductType(defaultProductType);
        setNameError('');
        setProductTypeCodeError('');
    };

    //del modal
    const handleOpenModalToDel = (productType: IProductType) => {
        setProductType(productType);
        setIsDelModalOpen(true);
    };
    const handleCloseDelModal = () => {
        setIsDelModalOpen(false);
        setProductType(defaultProductType);
    };

    //add ProductType
    const addProductType = (productTypeCode: string, name: string, detail: string) => {
        ProductTypeServices.addProductType(productTypeCode, name, detail).then((res) => {
            if (res.isSuccess) {
                handleCloseModal();
            } else {
                setNameError(res.Name);
                setProductTypeCodeError(res.ProductTypeCode);
            }
        })
    }

    //update ProductType
    const updateProductType = (id: number, productTypeCode: string, name: string, detail: string) => {
        ProductTypeServices.updateProductType(id, productTypeCode, name, detail).then((res) => {
            if (res.isSuccess) {
                alert("Cập nhật thành công");
            } else {
                setNameError(res.Name);
                setProductTypeCodeError(res.ProductTypeCode);
            }
        })
    }

    //delete ProductType
    const deleteProductType = (id: number) => {
        ProductTypeServices.deleteProductType(id).then((res) => {
            if (res.isSuccess) {
                handleCloseDelModal();
            } else {
                alert(res.Id);
            }
        })
    }

    const ModalHeight = () => {
        if (userData.modifyProductType !== "True") {
            return '400px';
        } else {
            return '360px';
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
        <div className='bg-white p-3'>
            <div className="row">
                <div className="col">
                    <h3 className='fw-bold'>Loại hàng hóa</h3>
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
                        height: ModalHeight(),
                        left: '31%',
                    },
                }}
                ariaHideApp={false}
            >
                <div>
                    <div className="modal-header border-bottom pb-3">
                        <h1 className="modal-title fs-5">{productType.id !== 0 ? 'Cập nhật loại hàng' : 'Thêm mới loại hàng'}</h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        <div className="container">
                            {userData.modifyProductType !== "True" ? (<>
                                <div className="alert alert-danger" role="alert">
                                    Bạn không có quyền chỉnh sửa, thêm
                                </div>
                            </>) : null}
                            <div className="row">
                                <div className="col-4">
                                    <Input
                                        label="Mã:"
                                        placeholder="Nhập mã hàng"
                                        name='productTypeCode'
                                        type='text'
                                        value={productType?.productTypeCode || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {productTypeCodeError !== '' ? <span className='text-danger'>{productTypeCodeError}</span> : ''}
                                </div>
                                <div className="col">
                                    <Input
                                        label="Tên loại:"
                                        placeholder="Nhập tên loại"
                                        name='name'
                                        type='text'
                                        value={productType?.name || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {nameError !== '' ? <span className='text-danger'>{nameError}</span> : ''}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <Input
                                        label="Ghi chú:"
                                        placeholder="Nhập ghi chú"
                                        name='detail'
                                        type='text'
                                        value={productType?.detail || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseModal}>Đóng</button>
                        {userData.modifyProductType === "True" ? (<>
                            {productType.id !== 0 ?
                                <button type="button" className="btn btn-warning w-25 rounded-2 ms-1"
                                    onClick={() => updateProductType(productType.id,
                                        productType?.productTypeCode || '',
                                        productType?.name || '',
                                        productType?.detail || '')}
                                >Lưu</button>
                                :
                                <button type="button" className="btn btn-success w-25 rounded-2 ms-1"
                                    onClick={() =>
                                        addProductType(productType?.productTypeCode || '',
                                            productType?.name || '',
                                            productType?.detail || '')}
                                >Tạo</button>
                            }
                        </>) : null}
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
                {userData.modifyProductType === "True" ? (<>
                    <div>
                        <div className="modal-header border-bottom pb-3">
                            <h1 className="modal-title fs-5">Xóa</h1>
                            <button type="button" className="btn-close" onClick={handleCloseDelModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-4">
                            Bạn có chắc muốn xóa <span className='fw-bold'>{productType.name}</span>
                        </div>
                        <div className="modal-footer border-top pt-3">
                            <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                            <button onClick={() => deleteProductType(productType.id)} type="button" className="btn btn-danger w-25 rounded-2 ms-1">Xóa</button>
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
                                    Bạn không có quyền xóa loại hàng
                                </div>
                            </div>
                            <div className="modal-footer border-top pt-3">
                                <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                            </div>
                        </div>
                    )
                }
            </Modal>
        </div>
    );
}

export default ProductType;
