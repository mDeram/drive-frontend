import React from "react";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

interface CheckboxProps {
    checked: boolean;
    handleChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    handleChange
}) => {
    return (
        <button onClick={() => handleChange(!checked)}>
            {checked ? <RiCheckboxFill/> : <RiCheckboxBlankLine/>}
        </button>
    )
}

export default Checkbox
