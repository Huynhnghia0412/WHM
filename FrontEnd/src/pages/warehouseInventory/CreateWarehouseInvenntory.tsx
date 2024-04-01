import React, { useState, useEffect, useMemo } from 'react';
import { IItem, IProduct, IRequestInOutNote, IUserModel } from '../../interfaces/Interfaces';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomInput from './../../components/warehouseInventory/CustomInput';
import Input from './../../components/Input';
import inputHelper from '../../helper/InputHelper';
import CustomInputDeviationQuantity from '../../components/warehouseInventory/CustomInputDeviationQuantity';
import CustomInputDeviationValue from '../../components/warehouseInventory/CustomInputDeviationValue';
import CheckInventoryServices from './../../services/CheckInventory/CheckInventoryServices';
import InOutServices from './../../services/InOut/InOutServices';
import { useLocation, useNavigate } from 'react-router-dom';
import { defaultNote } from '../../utilities/DefaultObject';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage/Redux/store';

const CreateWarehouseInvenntory = () => {
    const location = useLocation();
    const { state } = location || {};
    const { id } = state || {};
    const [isAdd, setIsAdd] = useState<boolean>(true);
    //userData
    const userData: IUserModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    const [userId, setUserId] = useState<string>(userData.id);
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [rowData, setRowData] = useState<IProduct[]>([]);
    const [note, setNote] = useState<IRequestInOutNote>(defaultNote);
    // error
    const [noteCodeError, setNoteCodeError] = useState<string>('');

    useEffect(() => {
        CheckInventoryServices.getCheckInventoryProducts().then((res) => {
            if (res.isSuccess) {
                setProductList(res.result.products || [])
            }
        })
        if (id > 0) {
            setIsAdd(false);
            const parsedId = id ? parseInt(id, 10) : null;
            InOutServices.getInOutNote(parsedId || 0).then((res) => {
                if (res.isSuccess) {
                    setNote(res.result.note || [])
                }
            })
        }
    }, [id]);

    useEffect(() => {
        // Tạo danh sách các mục mới từ productList với quantity ban đầu là 0
        if (isAdd) {
            const initialItems: IItem[] = productList.map(product => ({
                id: product.id,
                productId: product.id,
                price: product.price,
                quantity: 0,
                totalPrice: 0
            }));
            // Cập nhật trạng thái của note bằng cách thêm các mục vào items
            setNote(prevNote => ({
                ...prevNote,
                noteItems: initialItems
            }));
        }

        setRowData(productList.map(product => ({ ...product })));
    }, [productList]);

    const handleNoteInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedNote = inputHelper(event, { ...note });
        setNote(updatedNote);
    };

    const findItemById = (id: number) => {
        return note.noteItems.find(item => item.productId === id);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
        const { value } = event.target;
        const newQuantity = parseInt(value);

        // Check if item exists before accessing its properties
        const updatedNoteItems = note.noteItems.map(item => {
            if (item.productId === productId) {
                const totalPrice = newQuantity * item.price;
                return { ...item, quantity: newQuantity, totalPrice: totalPrice };
            }
            return item;
        });

        setNote(prevNote => ({
            ...prevNote,
            noteItems: updatedNoteItems
        }));
    };

    const colDefs: ColDef<any>[] = [
        { field: "id", headerName: "STT", width: 60, resizable: false },
        { field: "productCode", headerName: "Mã", width: 100, filter: true, floatingFilter: true, resizable: false },
        { field: "name", headerName: "Tên", width: 280, filter: true, floatingFilter: true, resizable: false },
        { field: "quantityInWareHouse", headerName: "Tồn kho", width: 100, filter: 'agNumberColumnFilter', floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thực tế", width: 100, sortable: false, resizable: false,
            cellRenderer: CustomInput,
            cellRendererParams: (params: any) => ({
                data: params.data,
                item: findItemById(params.data.id),
                handleQuantityChange: handleQuantityChange,
            }),
        },
        {
            field: "", headerName: "Lệch", width: 100, sortable: false, resizable: false,
            cellRenderer: CustomInputDeviationQuantity,
            cellRendererParams: (params: any) => ({
                data: params.data,
                item: findItemById(params.data.id),
            }),
        },
        {
            field: "", headerName: "Giá trị lệch", width: 130,
            cellRenderer: CustomInputDeviationValue,
            cellRendererParams: (params: any) => ({
                data: params.data,
                item: findItemById(params.data.id),
            }),
        },
    ];

    const components = useMemo<{
        [p: string]: any;
    }>(() => {
        return {
            CustomInput: CustomInput,
        };
    }, []);

    //pagination
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50, 100];

    //add note
    const addInventoryNote = (noteCode: string,
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
                if (res.isSuccess) {
                    alert("Thêm thành công phiếu kiểm kê");
                } else {
                    setNoteCodeError(res.NoteCode);
                }
            })
    }
    //update note
    const updateInventoryNote = (id: number, noteCode: string,
        noteDate: Date,
        des: string,
        customerId: number,
        wareHouseId: number,
        userId: string,
        productList: IItem[]) => {
        InOutServices.updateInOutNote(id, noteCode,
            noteDate,
            des,
            customerId,
            wareHouseId,
            userId,
            productList).then((res) => {
                if (res.isSuccess) {
                    alert("Cập nhật phiếu kiểm kê thành công");
                } else {
                    setNoteCodeError(res.NoteCode);
                }
            })
    }

    const resetState = () => {
        setIsAdd(true);
        setNote(defaultNote);
        setProductList([]);
        setNoteCodeError('');
    };

    const navigate = useNavigate()
    const reload = (noteCode: string) => {
        resetState();
        navigate("/createWarehouseInvenntory", {
            state: { note: null, id: 0 },
        });
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-9">
                    <div className='bg-white p-3'>
                        <h3 className='fw-bold'>
                            {isAdd ? "Thêm phiếu kiểm kê kho" : "Cập nhật phiếu kiểm kê kho"}
                            {!isAdd ?
                                <button className='btn btn-primary ms-3 fw-bold'
                                    onClick={() => reload(note.noteCode)}>
                                    <span><i className="bi bi-plus-circle me-1"></i></span>
                                    Thêm mới
                                </button> : null}
                        </h3>
                        <hr />
                        <div className="ag-theme-quartz" style={{ height: 500 }}>
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={colDefs}
                                components={components}
                                pagination={pagination}
                                paginationPageSize={paginationPageSize}
                                paginationPageSizeSelector={paginationPageSizeSelector}
                            />
                        </div>

                    </div>
                </div>
                <div className="col">
                    <div className='bg-white p-3 px-4'>
                        <div>
                            <Input
                                label="Mã phiếu kiểm"
                                placeholder=""
                                value={note.noteCode || ''}
                                name='noteCode'
                                type='text'
                                onChange={(e) => handleNoteInputChange(e)}
                            />
                            {noteCodeError !== '' ? <span className='text-danger'>{noteCodeError}</span> : ''}
                        </div>
                        <div className='mt-2'>
                            <Input
                                label="Ngày phiếu kiểm"
                                placeholder=""
                                value={note?.noteDate instanceof Date ? note?.noteDate.toISOString().split('T')[0] : ''}
                                name='noteDate'
                                type='date'
                                onChange={(e) => handleNoteInputChange(e)}
                            />
                        </div>
                        <div className='mt-2'>
                            <Input
                                label="Ghi chú"
                                placeholder=""
                                value={note.des || ''}
                                name='des'
                                type='text'
                                onChange={(e) => handleNoteInputChange(e)}
                            />
                        </div>
                        <div className='mt-3'>
                            {isAdd ? (
                                <button
                                    className='btn btn-success w-100 fw-bold'
                                    onClick={() => addInventoryNote(
                                        note.noteCode || '',
                                        note.noteDate || new Date(),
                                        note.des || '',
                                        1,
                                        1,
                                        userId || '',
                                        note.noteItems || []
                                    )}
                                >
                                    Tạo phiếu
                                </button>
                            ) : (
                                <button
                                    className='btn btn-warning w-100 fw-bold'
                                    onClick={() => updateInventoryNote(
                                        note.id || 0,
                                        note.noteCode || '',
                                        note.noteDate || new Date(),
                                        note.des || '',
                                        1,
                                        1,
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

        </div >
    );
}

export default CreateWarehouseInvenntory;
