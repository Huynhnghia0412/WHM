import React from 'react';

interface SelectReportProps {
    className?: string;
    options: any[];
    value?: number | string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectReport: React.FC<SelectReportProps> = ({ className, options, value, name, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="">
            <select
                className={className}
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

export default SelectReport;
