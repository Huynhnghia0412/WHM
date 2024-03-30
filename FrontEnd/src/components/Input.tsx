import React from 'react';

interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    value?: string;
    name: string;
    readonly?: boolean;
    row?: number;
    disable?: boolean;
    hidden?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', value, row, name, readonly, disable = false, hidden = false, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            // Sử dụng type assertion để bảo TypeScript rằng event là một trong hai loại sự kiện
            onChange(event as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className="">
            <label className="fw-bold" hidden={hidden}>{label}</label>
            <input
                type={type}
                className="form-control rounded-0 border-black"
                placeholder={placeholder}
                value={value} // Value controlled by parent component
                name={name}
                onChange={handleChange}
                disabled={disable}
                hidden={hidden}
                readOnly={readonly ?? false} // Use readonly prop directly
            />
        </div>
    );
};

export default Input;
