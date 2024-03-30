import React from 'react'
import { CustomCellRendererProps } from 'ag-grid-react';
import UsefulFunctions from './../utilities/UsefulFunctions';

interface TotalCustomProps extends CustomCellRendererProps {
    handleOpenModalToUpdate: (obj: Object) => void;
    handleOpenModalToDel: (obj: Object) => void;
}

const TotalCustom: React.FC<TotalCustomProps> = ({ data }) => {
    return (
        <>{UsefulFunctions.formatVNPrice(data.total)}</>
    )
}

export default TotalCustom