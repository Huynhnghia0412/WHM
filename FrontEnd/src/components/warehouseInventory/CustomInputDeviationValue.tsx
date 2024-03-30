import React from 'react';
import { IProduct } from "../../interfaces/Interfaces";
import { ICheckProduct } from './../../interfaces/Interfaces';
import UsefulFunctions from './../../utilities/UsefulFunctions';

// Hàm tính giá trị lệch
const calculateDeviationValue = (product: IProduct, item: ICheckProduct) => {
    if (!product || !item || isNaN(product.price) || isNaN(product.quantityInWareHouse) || isNaN(item.quantity)) {
        return 0;
    }
    return (product.price * product.quantityInWareHouse - item.quantity * product.price);
};

const CustomInputDeviationValue = ({ data, item }: { data: IProduct, item: ICheckProduct }) => {
    const deviationValue = calculateDeviationValue(data, item);

    return (
        <div>{UsefulFunctions.formatVNPrice(deviationValue)}</div>
    );
};

export default CustomInputDeviationValue;
