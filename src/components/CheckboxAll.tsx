import React from "react";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import Checkbox from "./Checkbox";

interface CheckboxAllProps {
    checked: boolean;
    selectAll: Function;
    clearSelected: Function;
}

const CheckboxAll: React.FC<CheckboxAllProps> = ({
    checked,
    selectAll,
    clearSelected
}) => {
    function handleClick(check: boolean) {
        if (check)
            selectAll();
        else
            clearSelected();
    }

    return (
        <Checkbox checked={checked} setChecked={handleClick}/>
    )
}

export default CheckboxAll
