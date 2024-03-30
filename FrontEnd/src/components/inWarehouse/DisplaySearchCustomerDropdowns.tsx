import React, { useEffect, useState } from 'react';
import { ICustomer } from '../../interfaces/Interfaces';

interface DisplaySearchCustomerDropdownsProps {
    list: ICustomer[];
    setSelectedCustomer: React.Dispatch<React.SetStateAction<ICustomer | undefined>>;
    handleCloseCustomerDropdowns: () => void;
}

const DisplaySearchCustomerDropdowns: React.FC<DisplaySearchCustomerDropdownsProps> = ({ list, setSelectedCustomer, handleCloseCustomerDropdowns }) => {
    const [filteredCustomers, setFilteredCustomers] = useState<ICustomer[]>([]);

    useEffect(() => {
        setFilteredCustomers(list);
    }, [list])

    const handleSearchCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        const filtered = list.filter((customer) =>
            customer.name.toLowerCase().includes(searchValue)
        );
        setFilteredCustomers(filtered);
    };

    const handleCustomerClick = (customer: ICustomer) => {
        setSelectedCustomer(customer);
    };

    return (
        <div className='searchCustomerDropdowns'>
            <div className="row justify-content-center p-2">
                <div className="col pe-0">
                    <input
                        type='search'
                        placeholder='Tìm kiếm kh/ncc theo Mã/Tên'
                        className='w-100'
                        onChange={handleSearchCustomer}
                    />
                    <ul className="customUl scroll-container p-0">
                        {filteredCustomers && filteredCustomers.map((customer) => (
                            <li key={customer.id}>
                                <button className='btn btn-light w-100 text-start rounded-0 mt-1'
                                    onClick={() => handleCustomerClick(customer)}
                                >
                                    <span className='fw-bold'>{customer.customerCode} - {customer.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-1 ps-2" style={{ width: "60px" }}>
                    <button className='btn btn-secondary align-content-end rounded-0'
                        onClick={handleCloseCustomerDropdowns}
                    >
                        <i className="bi bi-x-lg text-white fw-bold"></i>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default DisplaySearchCustomerDropdowns;