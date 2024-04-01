import React, { useState, useEffect, useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomButton from '../../components/CustomButton';
import { IRequestInOutNote, IUserModel } from '../../interfaces/Interfaces';
import CheckInventoryServices from './../../services/CheckInventory/CheckInventoryServices';
import ALLInOutCustomButton from './../../components/ALLInOutCustomButton';
import { defaultNote } from '../../utilities/DefaultObject';
import Modal from 'react-modal';
import InOutServices from './../../services/InOut/InOutServices';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage/Redux/store';

const AllWarehouseInventory = () => {
    const userData: IUserModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    const [noteList, setNoteList] = useState<IRequestInOutNote[]>([]);
    const [note, setNote] = useState<IRequestInOutNote>(defaultNote);
    const [rowData, setRowData] = useState<IRequestInOutNote[]>([]);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);

    useEffect(() => {
        CheckInventoryServices.getInventoryNotes().then((res) => {
            if (res.isSuccess) {
                setNoteList(res.result.notes || [])
            }
        })
    }, [isDelModalOpen]);

    useEffect(() => {
        setRowData(noteList.map(note => ({ ...note })));
    }, [noteList]);

    const colDefs: ColDef<any>[] = [
        { field: "id", headerName: "STT", width: 100, resizable: false },
        { field: "noteCode", headerName: "Mã", width: 200, filter: true, floatingFilter: true, resizable: false },
        { field: "noteDate", headerName: "Ngày", width: 200, filter: true, floatingFilter: true, resizable: false },
        { field: "des", headerName: "Ghi chú", width: 500, filter: true, floatingFilter: true, resizable: false },
        {
            field: "", headerName: "Thao tác", width: 220, sortable: false, resizable: false,
            cellRenderer: ALLInOutCustomButton,
            cellRendererParams: (params: any) => ({
                data: params.data,
                handleOpenModalToDel: handleOpenModalToDel,
            }),
        },
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

    //del modal
    const handleOpenModalToDel = (note: IRequestInOutNote) => {
        setNote(note);
        setIsDelModalOpen(true);
    };
    const handleCloseDelModal = () => {
        setNote(defaultNote);
        setIsDelModalOpen(false);
    };

    const handleToDelete = (id: number) => {
        InOutServices.deleteNote(id).then((res) => {
            if (res.isSuccess) {
                alert(res.messages)
                handleCloseDelModal()
            } else {
                alert("Không thể xóa")
            }
        })
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
                    <h3 className='fw-bold'>Chứng từ kiểm kê kho</h3>
                </div>
                <div className="col text-end px-4">

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
                {userData.modifyCheckInventory === "True" ? (<>
                    <div>
                        <div className="modal-header border-bottom pb-3">
                            <h1 className="modal-title fs-5">Xóa</h1>
                            <button type="button" className="btn-close" onClick={handleCloseDelModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-4">
                            Bạn có chắc muốn xóa <span className='fw-bold'>{note.noteCode}</span>
                        </div>
                        <div className="modal-footer border-top pt-3">
                            <button type="button" className="btn btn-outline-dark w-25 rounded-2" onClick={handleCloseDelModal}>Đóng</button>
                            <button onClick={() => handleToDelete(note.id)} type="button" className="btn btn-danger w-25 rounded-2 ms-1">Xóa</button>
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
                                    Bạn không có quyền xóa phiếu kiểm kê
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

export default AllWarehouseInventory;
