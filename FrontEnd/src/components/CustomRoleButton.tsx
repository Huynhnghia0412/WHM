import React from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { IRoleClaims } from '../interfaces/Interfaces';

interface CustomRoleButtonProps extends CustomCellRendererProps {
    handleOpenModalToUpdate: (obj: Object, roleClaims: IRoleClaims[]) => void;
    handleOpenModalToDel: (obj: Object) => void;
}

const CustomRoleButton: React.FC<CustomRoleButtonProps> = ({ data, handleOpenModalToUpdate, handleOpenModalToDel }) => {

    const handleUpdate = () => {
        handleOpenModalToUpdate(data.role, data.roleClaims);
    };

    const handleDelete = () => {
        handleOpenModalToDel(data.role);
    };

    return (
        <div className=''>
            <span onClick={handleUpdate} className=' border-0 ps-3' style={{ cursor: "pointer" }}>
                <i className="bi bi-pencil-square text-warning"></i>
            </span>
            <span onClick={handleDelete} className=' border-0 ms-1 ps-2' style={{ cursor: "pointer" }}>
                <i className="bi bi-trash3-fill text-danger"></i>
            </span>
        </div>
    );
};

export default CustomRoleButton;
