import React from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { useNavigate } from "react-router-dom";
import { IRequestInOutNote, IUserModel } from '../interfaces/Interfaces';

interface CustomButtonProps extends CustomCellRendererProps {
    handleOpenModalToDel: (note: IRequestInOutNote) => void;
    userData: IUserModel;
}

const ALLInOutCustomButton: React.FC<CustomButtonProps> = ({ data, userData, handleOpenModalToDel }) => {
    const { id, noteCode } = data;

    const navigate = useNavigate();

    const handleNavigateToUpdate = (noteCode: string, id: number) => {
        if (noteCode.includes('NK')) {
            if (userData.modifyInOutNote === "True") {
                navigate("/inWarehouse", {
                    state: { note: data, id: id },
                });
            } else {
                alert("Bạn không có quyền thêm, sửa phiếu nhập kho");
            }
        } else if (noteCode.includes('XK')) {
            if (userData.modifyInOutNote === "True") {
                navigate("/outWarehouse", {
                    state: { note: data, id: id },
                });
            } else {
                alert("Bạn không có quyền thêm, sửa phiếu xuất kho");
            }
        } else {
            if (userData.modifyInOutNote === "True") {
                navigate("/createWarehouseInvenntory", {
                    state: { note: data, id: id },
                });
            } else {
                alert("Bạn không có quyền thêm, sửa phiếu kiểm kê kho");
            }
        }
    }

    const handleDel = (noteCode: string) => {
        if (noteCode.includes('NK')) {
            if (userData.modifyInOutNote === "True") {
                handleOpenModalToDel(data)
            } else {
                alert("Bạn không có quyền xóa phiếu nhập kho");
            }
        } else if (noteCode.includes('XK')) {
            if (userData.modifyInOutNote === "True") {
                handleOpenModalToDel(data)
            } else {
                alert("Bạn không có quyền xóa phiếu xuất kho");
            }
        } else {
            if (userData.modifyInOutNote === "True") {
                handleOpenModalToDel(data)
            } else {
                alert("Bạn không có quyền xóa phiếu kiểm kê kho");
            }
        }
    }

    return (
        <div className=''>
            <span onClick={() => handleNavigateToUpdate(noteCode, id)} className=' border-0 ps-3' style={{ cursor: "pointer" }}>
                <i className="bi bi-pencil-square text-warning"></i>
            </span>
            <span onClick={() => handleDel(noteCode)} className=' border-0 ms-1 ps-2' style={{ cursor: "pointer" }}>
                <i className="bi bi-trash3-fill text-danger"></i>
            </span>
        </div>
    );
};

export default ALLInOutCustomButton;
