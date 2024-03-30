import React from 'react';
import { IProduct } from "../../interfaces/Interfaces";
import { IItem } from './../../interfaces/Interfaces';

// Hàm tính số lượng lệch
const calculateDeviationQuantity = (product: IProduct, item: IItem) => {
    if (!product || !item || isNaN(product.quantityInWareHouse) || isNaN(item.quantity)) {
        return 0;
    }
    return (product.quantityInWareHouse - item.quantity);
};

const CustomInputDeviationQuantity = ({ data, item }: { data: IProduct, item: IItem }) => {
    const deviationQuantity = calculateDeviationQuantity(data, item);

    return (
        <div className=''>
            {deviationQuantity}
        </div>
    );
};

export default CustomInputDeviationQuantity;
