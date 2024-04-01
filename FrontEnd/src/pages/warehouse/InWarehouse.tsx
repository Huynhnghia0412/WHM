import React, { useEffect, useState } from 'react'
import DisplaySearchCustomerDropdowns from '../../components/inWarehouse/DisplaySearchCustomerDropdowns';
import Input from './../../components/Input';
import inputHelper from '../../helper/InputHelper';
import { ICustomer, IRequestInOutNote, IProduct, IItem, IWareHouse, IUserModel } from './../../interfaces/Interfaces';
import CustomerServices from './../../services/Customer/CustomerServices';
import ProductServices from '../../services/Product/ProductServices';
import DisplaySearchProductDropdowns from '../../components/inWarehouse/DisplaySearchProductDropdowns';
import UsefulFunctions from './../../utilities/UsefulFunctions';
import InOutServices from './../../services/InOut/InOutServices';
import WareHouseServices from '../../services/WareHouse/WareHouseServices';
import Select from './../../components/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import { defaultItem, defaultNote } from '../../utilities/DefaultObject';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage/Redux/store';

const InWarehouse = () => {
    const location = useLocation();
    const { state } = location || {};
    const { id } = state || {};
    //userData
    const userData: IUserModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    const [isAdd, setIsAdd] = useState<boolean>(true);

    const [userId, setUserId] = useState<string>(userData.id);
    const [note, setNote] = useState<IRequestInOutNote>(defaultNote);
    const [customerList, setCustomerList] = useState<ICustomer[]>([]);
    const [customer, setCustomer] = useState<ICustomer>();
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [productAddedList, setProductAddedList] = useState<IProduct[]>([]);
    const [itemList, setItemList] = useState<IItem[]>([defaultItem]);
    const [wareHouseList, setWareHouseList] = useState<IWareHouse[]>([]);
    const [showSearchCustomerDropdowns, setShowSearchCustomerDropdowns] = useState(false);
    //error
    const [customerIdError, setCustomerIdError] = useState<string>('');
    const [warehouseIdError, setWarehouseIdError] = useState<string>('');
    const [noteCodeError, setNoteCodeError] = useState<string>('');
    const [productListError, setProductListError] = useState<string>('');

    useEffect(() => {
        CustomerServices.getCustomers().then((res) => {
            if (res.isSuccess) {
                setCustomerList(res.result.customers || [])
            }
        })
        ProductServices.getProducts().then((res) => {
            if (res.isSuccess) {
                setProductList(res.result.products || [])
            }
        })
        WareHouseServices.getWareHouses().then((res) => {
            if (res.isSuccess) {
                setWareHouseList(res.result.wareHouses || [])
            }
        })

        if (id > 0) {
            setIsAdd(false);
            const parsedId = id ? parseInt(id, 10) : null;
            InOutServices.getInOutNote(parsedId || 0).then((res) => {
                if (res.isSuccess) {
                    setNote(res.result.note || [])
                    setCustomer(res.result.note.customer || [])
                    setProductAddedList(prevProductAddedList =>
                        res.result.products.map((product: IProduct) => ({
                            ...product,
                            quantity: product.quantityInWareHouse
                        }))
                    );
                    const newItemList = res.result.products.map((product: IProduct) => ({
                        id: 0,
                        productId: product.id,
                        price: product.price,
                        quantity: product.quantityInWareHouse,
                        totalPrice: product.price
                    }));
                    setItemList(newItemList);
                }
            })
        }
    }, [])

    const handleCustomerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCustomer = inputHelper(event, { ...customer });
        setCustomer(updatedCustomer);
    };
    const handleNoteInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedNote = inputHelper(event, { ...note });
        setNote(updatedNote);
        setWarehouseIdError('');
    };

    const handleToggleCustomerDropdowns = () => {
        setShowSearchCustomerDropdowns(!showSearchCustomerDropdowns);
        setCustomerIdError('');
        setProductListError('');
        setWarehouseIdError('');
    };

    const handleCloseCustomerDropdowns = () => {
        setShowSearchCustomerDropdowns(false);
    };

    //add product to item
    const handleAddToItemsAndProductAddedList = (product: IProduct) => {
        setProductListError('');
        setCustomerIdError('');
        setWarehouseIdError('');
        // Kiểm tra xem sản phẩm đã tồn tại trong danh sách item hay không
        const itemExists = itemList.some(item => item.productId === product.id);
        // Nếu sản phẩm không tồn tại trong cả hai danh sách, thêm mới
        if (!itemExists) {
            const newItem: IItem = {
                id: product.id,
                productId: product.id,
                price: product.price,
                quantity: 1,
                totalPrice: product.price
            };
            const updatedItemList = [...itemList, newItem];
            setItemList(updatedItemList);

            const updatedNote = { ...note, noteItems: updatedItemList };
            setNote(updatedNote);

            setProductAddedList(prevProductAddedList => [...prevProductAddedList, product]);
        }
    };

    const handleDeleteInItemsAndProductAddedList = (id: number) => {
        // Xóa phần tử trong itemList dựa trên productId
        const updatedItemList = itemList.filter(item => item.productId !== id);
        setItemList(updatedItemList);

        const updatedNote = { ...note, noteItems: updatedItemList };
        setNote(updatedNote);

        // Xóa phần tử trong productAddedList dựa trên id
        const updatedProductAddedList = productAddedList.filter(product => product.id !== id);
        setProductAddedList(updatedProductAddedList);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
        const { value } = event.target;
        const newQuantity = parseInt(value);

        // Cập nhật số lượng của sản phẩm trong productAddedList
        const updatedProductAddedList = productAddedList.map(product => {
            if (product.id === productId) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        });

        // Cập nhật số lượng của sản phẩm trong itemList
        const updatedItemList = itemList.map(item => {
            if (item.productId === productId) {
                const totalPrice = newQuantity * item.price; // Tính toán tổng thành tiền
                return { ...item, quantity: newQuantity, totalPrice: totalPrice };
            }
            return item;
        });

        // Cập nhật productAddedList và itemList
        setProductAddedList(updatedProductAddedList);
        setItemList(updatedItemList);

        const updatedNote = { ...note, noteItems: updatedItemList };
        setNote(updatedNote);
    };

    //add note
    const addInNote = (noteCode: string,
        noteDate: Date,
        des: string,
        customerId: number,
        wareHouseId: number,
        userId: string,
        productList: IItem[]) => {
        InOutServices.addInOutNote(noteCode,
            noteDate,
            des,
            customerId,
            wareHouseId,
            userId,
            productList).then((res) => {
                console.log(res);
                if (res.isSuccess) {
                    alert("Thêm phiếu nhập kho thành công");
                } else {
                    setCustomerIdError(res.CustomerId);
                    setNoteCodeError(res.NoteCode);
                    setWarehouseIdError(res.WareHouseId);
                    setProductListError(res.ProductList);
                }
            })
    }
    //update note
    const updateInNote = (id: number, noteCode: string,
        noteDate: Date,
        des: string,
        customerId: number,
        wareHouseId: number,
        userId: string,
        productList: IItem[]) => {
        console.log(note)
        InOutServices.updateInOutNote(id, noteCode,
            noteDate,
            des,
            customerId,
            wareHouseId,
            userId,
            productList).then((res) => {
                console.log(res);
                if (res.isSuccess) {
                    alert("Cập nhật phiếu nhập kho thành công");
                } else {
                    setCustomerIdError(res.CustomerId);
                    setNoteCodeError(res.NoteCode);
                    setWarehouseIdError(res.WareHouseId);
                    setProductListError(res.ProductList);
                }
            })
    }

    const resetState = () => {
        setIsAdd(true);
        setNote(defaultNote);
        setCustomerList([]);
        setCustomer(undefined);
        setProductList([]);
        setProductAddedList([]);
        setItemList([defaultItem]);
        setWareHouseList([]);
        setShowSearchCustomerDropdowns(false);
        setCustomerIdError('');
        setWarehouseIdError('');
        setNoteCodeError('');
        setProductListError('');
    };

    const navigate = useNavigate()
    const reload = (noteCode: string) => {
        resetState();
        if (noteCode.includes("NK")) {
            navigate("/inWarehouse", {
                state: { note: null, id: 0 },
            });
        } else {
            navigate("/outWarehouse", {
                state: { note: null, id: 0 },
            });
        }
    }

    return (
        <div className='border border-black p-3 bg-inout-green'>
            <div className=''>
                <h3 className='m-0 fw-bold'>
                    {isAdd ? "Thêm phiếu nhập kho" : "Cập nhật phiếu nhập kho"}
                    {!isAdd ?
                        <button className='btn btn-primary ms-3 fw-bold'
                            onClick={() => reload(note.noteCode)}>
                            <span><i className="bi bi-plus-circle me-1"></i></span>
                            Thêm mới
                        </button> : null}
                </h3>
                <hr />
            </div>
            <div className='border border-black p-3 bg-white'>
                <div className='row'>
                    <div className="col-9">
                        <div className="row">
                            <div className='col-4'>
                                <Input
                                    label="Mã khách hàng"
                                    placeholder=""
                                    value={customer?.customerCode || ''}
                                    name='customerCode'
                                    readonly
                                    onChange={(e) => handleCustomerInputChange(e)}
                                />
                                {customerIdError !== '' ? <span className='text-danger'>{customerIdError}</span> : ''}
                            </div>
                            <div className='col'>
                                <div className='row'>
                                    <div className="col pe-0">
                                        <Input
                                            label="Tên khách hàng:"
                                            placeholder=""
                                            name='name'
                                            value={customer?.name || ''}
                                            readonly
                                            onChange={(e) => handleCustomerInputChange(e)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label className='fw-bold'>Tìm KH/NCC:</label>
                                        <button className='btn btn-secondary border-black me-2 w-100' onClick={handleToggleCustomerDropdowns}><i className="bi bi-search" ></i></button>
                                    </div>
                                </div>
                                {/* Dropdowns */}
                                {showSearchCustomerDropdowns ? <DisplaySearchCustomerDropdowns
                                    list={customerList}
                                    setSelectedCustomer={setCustomer}
                                    handleCloseCustomerDropdowns={handleCloseCustomerDropdowns}
                                /> : ''}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className='col-4'>
                                <Input
                                    label="Mã số thuế:"
                                    placeholder=""
                                    name='tax'
                                    value={customer?.tax || ''}
                                    readonly
                                    onChange={(e) => handleCustomerInputChange(e)}
                                />
                            </div>
                            <div className='col'>
                                <Input
                                    label="Địa chỉ:"
                                    placeholder=""
                                    name='address'
                                    value={customer?.address || ''}
                                    readonly
                                    onChange={(e) => handleCustomerInputChange(e)}
                                />
                            </div>
                            <div className='col'>
                                <Select
                                    label="Chọn kho:"
                                    options={wareHouseList.map(wareHouse => ({
                                        value: wareHouse.id.toString(),
                                        label: wareHouse.name
                                    }))}
                                    value={note?.wareHouseId || 0}
                                    name="wareHouseId"
                                    onChange={(e) => handleNoteInputChange(e)}
                                />
                                {warehouseIdError !== '' ? <span className='text-danger'>{warehouseIdError}</span> : ''}
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input
                                label="Ghi chú chứng từ:"
                                placeholder=""
                                name='des'
                                value={note?.des || ''}
                                onChange={(e) => handleNoteInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col border-left px-4">
                        <div className="">
                            <Input
                                label="Số chứng từ:"
                                placeholder=""
                                name='noteCode'
                                value={note?.noteCode || ''}
                                onChange={(e) => handleNoteInputChange(e)}
                            />
                            {noteCodeError !== '' ? <span className='text-danger'>{noteCodeError}</span> : ''}
                        </div>
                        <div className="mt-2">
                            <Input
                                label="Ngày chứng từ:"
                                placeholder=""
                                name='noteDate'
                                type='date'
                                value={note?.noteDate instanceof Date ? note?.noteDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => handleNoteInputChange(e)}
                            />
                        </div>
                        <div className="mt-4">
                            {isAdd ? (
                                <button
                                    className='btn btn-success w-100 fw-bold'
                                    onClick={() => addInNote(
                                        note.noteCode || '',
                                        note.noteDate || new Date(),
                                        note.des || '',
                                        customer?.id || 0,
                                        note.wareHouseId || 0,
                                        userId || '',
                                        note.noteItems || []
                                    )}
                                >
                                    Tạo phiếu
                                </button>
                            ) : (
                                <button
                                    className='btn btn-warning w-100 fw-bold'
                                    onClick={() => updateInNote(
                                        note.id || 0,
                                        note.noteCode || '',
                                        note.noteDate || new Date(),
                                        note.des || '',
                                        customer?.id || 0,
                                        note.wareHouseId || 0,
                                        userId || '',
                                        note.noteItems || []
                                    )}
                                >
                                    Lưu phiếu
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='border border-black bg-white mt-3'>
                <div className="container">
                    <div className='px-2 pt-3'>
                        {/* Dropdowns */}
                        <DisplaySearchProductDropdowns list={productList} handleAddToItemsAndProductAddedList={handleAddToItemsAndProductAddedList} />
                    </div>
                    {productListError !== '' ? <span className='text-danger'>{productListError}</span> : ''}
                    <hr />
                    <div className="table-container">
                        <table className="table table-sticky">
                            <thead>
                                <tr>
                                    <th className="text-center border-black fw-bold bg-body-secondary">STT</th>
                                    <th className="text-center border-black fw-bold bg-body-secondary">Mã</th>
                                    <th className="text-center border-black fw-bold bg-body-secondary">Tên sản phẩm</th>
                                    <th className="text-center border-black fw-bold bg-body-secondary">SL</th>
                                    <th className="text-center border-black fw-bold bg-body-secondary">Đơn giá</th>
                                    <th className="text-center border-black fw-bold bg-body-secondary">Thành tiền</th>
                                    <th className="text-center border-black fw-bold bg-body-secondary"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {productAddedList && productAddedList.map((p) => (
                                    <tr key={p.id}>
                                        <td className="text-center border-black">{p.id}</td>
                                        <td className="text-center border-black">{p.productCode}</td>
                                        <td className="text-center border-black">{p.name}</td>
                                        {/* Số lượng */}
                                        <td className="text-center border-black">
                                            <input
                                                type='number'
                                                className=''
                                                style={{ width: "100px" }}
                                                name='quantity'
                                                min={0}
                                                value={p.quantity || 0}
                                                onChange={(e) => handleQuantityChange(e, p.id)}
                                            />
                                        </td>
                                        {/* Đơn giá */}
                                        <td className="text-center border-black">{UsefulFunctions.formatVNPrice(p.price)}</td>
                                        {/* Thành tiền */}
                                        <td className="text-center border-black">
                                            {UsefulFunctions.formatVNPrice(itemList
                                                .filter(item => item.productId === p.id)
                                                .map(item => item.quantity * p.price)
                                                .reduce((total, subtotal) => total + (subtotal || 0), 0))
                                            }</td>
                                        <td className="text-center border-black">
                                            <button className='btn btn-close-white' onClick={() => handleDeleteInItemsAndProductAddedList(p.id)}><i className="bi bi-trash3-fill text-danger"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InWarehouse