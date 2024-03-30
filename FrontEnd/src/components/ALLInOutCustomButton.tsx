import React from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { useNavigate } from "react-router-dom";
import { IRequestInOutNote } from '../interfaces/Interfaces';

interface CustomButtonProps extends CustomCellRendererProps {
    handleOpenModalToDel: (note: IRequestInOutNote) => void;
}

const ALLInOutCustomButton: React.FC<CustomButtonProps> = ({ data, handleOpenModalToDel }) => {
    const { id, noteCode } = data;

    const navigate = useNavigate();

    const handleNavigateToUpdate = (noteCode: string, id: number) => {
        if (noteCode.includes('NK')) {
            navigate("/inWarehouse", {
                state: { note: data, id: id },
            });
        } else if (noteCode.includes('XK')) {
            navigate("/outWarehouse", {
                state: { note: data, id: id },
            });
        } else {
            navigate("/createWarehouseInvenntory", {
                state: { note: data, id: id },
            });
        }
    }

    return (
        <div className=''>
            <span onClick={() => handleNavigateToUpdate(noteCode, id)} className=' border-0 ps-3' style={{ cursor: "pointer" }}>
                <i className="bi bi-pencil-square text-warning"></i>
            </span>
            <span onClick={() => handleOpenModalToDel(data)} className=' border-0 ms-1 ps-2' style={{ cursor: "pointer" }}>
                <i className="bi bi-trash3-fill text-danger"></i>
            </span>
        </div>
    );
};

export default ALLInOutCustomButton;
