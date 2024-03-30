import React, { ChangeEvent } from 'react';

interface CheckboxProps {
    label: string;
    className?: string;
    name: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, checked = false, name, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked; // Lấy giá trị checked từ sự kiện
        onChange(isChecked); // Gọi hàm onChange với giá trị isChecked
    };

    return (
        <div>
            <input
                type="checkbox"
                className={`me-2 ${className}`}
                id={name}
                name={name}
                checked={checked}
                onChange={handleChange} // Sử dụng hàm handleChange để xử lý sự kiện onChange
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default Checkbox;
