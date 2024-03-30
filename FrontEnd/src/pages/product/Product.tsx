import React, { useState, useEffect, useMemo } from 'react';
import { IProduct } from '../../interfaces/Interfaces';
import { ColDef } from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from '../../components/CustomButton';
import Input from './../../components/Input';
import Modal from 'react-modal';
import inputHelper from '../../helper/InputHelper';
import ProductServices from '../../services/Product/ProductServices';
import { IProductType } from './../../interfaces/Interfaces';
import UsefulFunctions from './../../utilities/UsefulFunctions';
import { defaultProduct } from '../../utilities/DefaultObject';


const Product = () => {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [productTypeList, setProductTypeList] = useState<IProductType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    const [product, setProduct] = useState<IProduct>(defaultProduct);
    const [rowData, setRowData] = useState<IProduct[]>([]);
    //errors
    const [productCodeError, setProductCodeError] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [productTypeIdError, setProductTypeIdError] = useState<string>('');
    const [priceError, setPriceError] = useState<string>('');
    const [unitError, setUnitError] = useState<string>('');

    useEffect(() => {
        ProductServices.getProducts().then((res) => {
            console.log(res);
            if (res.isSuccess) {
                setProductList(res.result.products || [])
                setProductTypeList(res.result.productTypes || [])
            }
        })
    }, [isDelModalOpen, isModalOpen]);

    useEffect(() => {
        setRowData(productList.map(product => ({ ...product })));
    }, [productList]);

    const colDefs: ColDef<any>[] = [
        { field: "id", headerName: "STT", width: 70, resizable: false },
        { field: "productCode", headerName: "Mã", width: 150, filter: true, floatingFilter: true, resizable: false },
        { field: "name", headerName: "Tên", width: 300, filter: true, floatingFilter: true, resizable: false },
        { field: "unit", headerName: "Đơn vị", width: 100, filter: true, floatingFilter: true, resizable: false },
        { field: "productType.name", headerName: "Loại", width: 170, filter: true, floatingFilter: true, resizable: false },
        { field: "price", headerName: "Đơn giá", width: 150, filter: 'agNumberColumnFilter', floatingFilter: true, resizable: false },
        { field: "quantityInWareHouse", headerName: "Tồn kho", width: 130, filter: 'agNumberColumnFilter', floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thao tác", width: 150, sortable: false, resizable: false,
            cellRenderer: CustomButton,
            cellRendererParams: (params: any) => ({
                data: params.data,
                item: UsefulFunctions.findItemById(productList, params.data.id),
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
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const updatedProduct = inputHelper(event, { ...product });
        setProduct(updatedProduct);
    };

    //add, update modal
    const handleOpenModalToUpdate = (product: IProduct) => {
        setProduct(product);
        setIsModalOpen(true);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProduct(defaultProduct);
        setNameError('');
        setProductCodeError('');
        setProductTypeIdError('');
        setPriceError('');
        setUnitError('');
    };

    //del modal
    const handleOpenModalToDel = (product: IProduct) => {
        setProduct(product);
        setIsDelModalOpen(true);
    };
    const handleCloseDelModal = () => {
        setIsDelModalOpen(false);
        setProduct(defaultProduct);
    };

    //add Product
    const addProduct = (productCode: string, name: string, status: string, price: number, unit: string, des: string, productTypeId: number) => {
        ProductServices.addProduct(productCode, name, status, price, unit, des, productTypeId).then((res) => {
            console.log(res);
            if (res.isSuccess) {
                handleCloseModal();
            } else {
                setNameError(res.Name);
                setProductCodeError(res.ProductCode);
                setProductTypeIdError(res.ProductTypeId);
                setUnitError(res.Unit);
                setPriceError(res.Price);
            }
        })
    }

    //update Product
    const updateProduct = (id: number, productCode: string, name: string, status: string, price: number, unit: string, des: string, productTypeId: number) => {
        ProductServices.updateProduct(id, productCode, name, status, price, unit, des, productTypeId).then((res) => {
            if (res.isSuccess) {
                alert("Cập nhật thành công");
            } else {
                setNameError(res.Name);
                setProductCodeError(res.ProductCode);
                setProductTypeIdError(res.ProductTypeId);
                setUnitError(res.Unit);
                setPriceError(res.Price);
            }
        })
    }

    //delete Product
    const deleteProduct = (id: number) => {
        ProductServices.deleteProduct(id).then((res) => {
            if (res.isSuccess) {
                handleCloseDelModal();
            } else {
                alert("Xóa thất bại");
            }
        })
    }

    return (
        <div className='bg-white p-3'>
            <div className="row">
                <div className="col">
                    <h3 className='fw-bold'>Hàng hóa tồn kho</h3>
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
                        height: '630px',
                        left: '35%',
                    },
                }}
                ariaHideApp={false}
            >
                <div>
                    <div className="modal-header border-bottom pb-3">
                        <h1 className="modal-title fs-5">{product?.id !== 0 ? 'Cập nhật hàng hóa' : 'Thêm mới hàng hóa'}</h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <Input
                                        label="Mã:"
                                        placeholder="Nhập mã"
                                        name='productCode'
                                        type='text'
                                        value={product?.productCode || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {productCodeError !== '' ? <span className='text-danger'>{productCodeError}</span> : ''}
                                </div>
                                <div className="col">
                                    <Input
                                        label="Tên sản phẩm:"
                                        placeholder="Nhập tên"
                                        name='name'
                                        type='text'
                                        value={product?.name || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {nameError !== '' ? <span className='text-danger'>{nameError}</span> : ''}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <Input
                                        label="Giá:"
                                        placeholder="Giá hàng"
                                        name='price'
                                        type='number'
                                        value={product?.price.toString() || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {priceError !== '' ? <span className='text-danger'>{priceError}</span> : ''}
                                </div>
                                <div className="col">
                                    <Input
                                        label="ĐVT:"
                                        placeholder="Đơn vị tính"
                                        name='unit'
                                        type='text'
                                        value={product?.unit.toString() || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                    {unitError !== '' ? <span className='text-danger'>{unitError}</span> : ''}
                                </div>
                                <div className="col">
                                    <label className='fw-bold'>Trạng thái:</label>
                                    <select
                                        className='form-select rounded-0 border-black'
                                        name='status'
                                        value={product?.status || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        <option selected>--Chọn trạng thái--</option>
                                        <option value='Mở'>Mở</option>
                                        <option value='Đóng'>Đóng</option>
                                    </select>
                                    {productTypeIdError !== '' ? <span className='text-danger'>{productTypeIdError}</span> : ''}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <label className='fw-bold'>Loại:</label>
                                    <select
                                        className='form-select rounded-0 border-black'
                                        name='productTypeId'
                                        value={product?.productTypeId || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        <option >--Chọn loại--</option>
                                        {productTypeList?.map((type: IProductType, index: number) => (
                                            <option key={index} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>
                                    {productTypeIdError !== '' ? <span className='text-danger'>{productTypeIdError}</span> : ''}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <label className='fw-bold'>Mô tả:</label>
                                    <textarea
                                        className='form-control rounded-0 border-black'
                                        rows={5}
                                        placeholder="Nhập mô tả"
                                        name='des'
                                        value={product?.des || ''}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseModal}>Đóng</button>
                        {product?.id !== 0 ?
                            <button type="button" className="btn btn-warning w-25 rounded-2 ms-1"
                                onClick={() =>
                                    updateProduct(product?.id || 0,
                                        product?.productCode || '',
                                        product?.name || '',
                                        product?.status || '',
                                        product?.price || 0,
                                        product?.unit || '',
                                        product?.des || '',
                                        product?.productTypeId || 0)}
                            >Lưu</button>
                            :
                            <button type="button" className="btn btn-success w-25 rounded-2 ms-1"
                                onClick={() =>
                                    addProduct(product?.productCode || '',
                                        product?.name || '',
                                        product?.status || '',
                                        product?.price || 0,
                                        product?.unit || '',
                                        product?.des || '',
                                        product?.productTypeId || 0)}
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
                        Bạn có chắc muốn xóa <span className='fw-bold'>{product.name}</span>
                    </div>
                    <div className="modal-footer border-top pt-3">
                        <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                        <button onClick={() => deleteProduct(product.id)} type="button" className="btn btn-danger w-25 rounded-2 ms-1">Xóa</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Product;
