import React from 'react';

interface InputReportProps {
    className?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    name: string;
    readonly?: boolean;
    row?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputReport: React.FC<InputReportProps> = ({ className, placeholder, type = 'text', value, row, name, readonly, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            // Sử dụng type assertion để bảo TypeScript rằng event là một trong hai loại sự kiện
            onChange(event as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className="">
            <input
                type={type}
                className={className}
                placeholder={placeholder}
                value={value} // Value controlled by parent component
                name={name}
                onChange={handleChange}
                readOnly={readonly ?? false} // Use readonly prop directly
            />
        </div>
    );
};

export default InputReport;
