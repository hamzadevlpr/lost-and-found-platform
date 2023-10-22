import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const FormDatepicker = ({ onDateChange }) => {
    const [value, setValue] = useState({
        startDate: null
    });

    const handleValueChange = (newValue) => {
        setValue(newValue);
        onDateChange(newValue.startDate);
    }

    return (
        <div className="border border-gray-300 rounded-md">
            <Datepicker
                useRange={false}
                asSingle={true}
                value={value}
                onChange={handleValueChange}
            />
        </div>
    );
};

export default FormDatepicker;