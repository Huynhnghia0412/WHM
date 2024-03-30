import React from 'react';

const CustomInput = ({ data, item, handleQuantityChange }: { data: any, item: any, handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void }) => {
    const { id } = data;
    const quantity = item ? item.quantity : 0;
    console.log(item)

    return (
        <div className=''>
            <input
                type='number'
                className='form-control'
                style={{ width: "70px" }}
                name='quantity'
                min={0}
                value={quantity}
                onChange={(e) => handleQuantityChange(e, id)}
            />
        </div>
    );
};

export default CustomInput;
