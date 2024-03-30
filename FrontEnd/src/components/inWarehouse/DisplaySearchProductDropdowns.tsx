import React, { useEffect, useState } from 'react';
import UsefulFunctions from './../../utilities/UsefulFunctions';
import { IProduct } from './../../interfaces/Interfaces';

interface DisplaySearchProductDropdownsProps {
    list: IProduct[];
    handleAddToItemsAndProductAddedList: (product: IProduct) => void;
}

const DisplaySearchProductDropdowns: React.FC<DisplaySearchProductDropdownsProps> = ({ list, handleAddToItemsAndProductAddedList }) => {
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [showSearchProductDropdowns, setShowSearchProductDropdowns] = useState(false);

    useEffect(() => {
        setFilteredProducts(list);
    }, [list])

    const handleSearchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowSearchProductDropdowns(true);
        const searchValue = event.target.value.toLowerCase();
        const filtered = list.filter((Product) =>
            Product.name.toLowerCase().includes(searchValue) ||
            Product.productCode.toLowerCase().includes(searchValue)
        );
        setFilteredProducts(filtered);

        if (filteredProducts.length <= 0) {
            setShowSearchProductDropdowns(false);
        }

        if (event.target.value.toLowerCase().length <= 0) {
            setFilteredProducts(list);

        }
    };

    const handleOpenProductDropdowns = () => {
        setShowSearchProductDropdowns(true);
    };

    const handleCloseProductDropdowns = () => {
        setShowSearchProductDropdowns(false);
    };

    const handleAddClick = (product: IProduct) => {
        handleAddToItemsAndProductAddedList(product);
    };

    return (
        <div className='w-50'>
            <input
                type='search'
                placeholder='Tìm kiếm hàng hóa theo Mã/Tên'
                className='w-100'
                onChange={handleSearchProduct}
                onClick={handleOpenProductDropdowns}
            />
            <div className={showSearchProductDropdowns ? '' : 'd-none'}>
                <div className='searchProductDropdowns'>
                    <div className="row">
                        <div className="col">
                            <p className='fst-italic m-0'>Danh sách sản phẩm để thêm: <span className=' fst-italic'>Mã - Tên - Giá - Tồn</span></p>
                            <ul className="customUl col-product-container p-2 border m-0">
                                {filteredProducts && filteredProducts.map((p) => (
                                    <li key={p.id} className='bg-body-tertiary mb-2 border'>
                                        <div className="row">
                                            <div className="col">
                                                <button className='btn btn-light w-100 text-start rounded-0'>
                                                    <span className='fw-bold'>{p.productCode} -  {p.name} - {UsefulFunctions.formatVNPrice(p.price)} - {p.quantityInWareHouse}</span>
                                                </button>
                                            </div>
                                            <div className="col-2">
                                                <button className='btn btn-primary rounded-2'
                                                    onClick={() => handleAddClick(p)}
                                                >
                                                    Thêm
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-1 p-0">  <button className='btn btn-secondary align-content-end rounded-0'
                            onClick={handleCloseProductDropdowns}
                        >
                            <i className="bi bi-x-lg text-white fw-bold"></i>
                        </button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplaySearchProductDropdowns;