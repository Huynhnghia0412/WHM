import React from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { IUserClaims } from '../interfaces/Interfaces';

interface CustomUserButtonProps extends CustomCellRendererProps {
    handleOpenModalToUpdate: (obj: Object, roleClaims: IUserClaims[]) => void;
    handleOpenModalToDel: (obj: Object) => void;
}

const CustomUserButton: React.FC<CustomUserButtonProps> = ({ data, handleOpenModalToUpdate, handleOpenModalToDel }) => {

    const handleUpdate = () => {
        handleOpenModalToUpdate(data, data.userClaims);
    };

    const handleDelete = () => {
        handleOpenModalToDel(data);
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

export default CustomUserButton;
