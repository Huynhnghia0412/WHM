import React from 'react';

interface SelectProps {
    label: string;
    options: any[];
    value?: number | string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, value, name, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="">
            <label className="fw-bold">{label}</label>
            <select
                className="form-select rounded-0 border-black"
                value={value}
                name={name}
                onChange={handleChange}
            >
                <option>-----</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
