import classNames from "classnames";
import React from "react";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

interface CheckboxProps {
    checked: boolean | undefined;
    setChecked: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    setChecked
}) => {
    return (
        <div className="h-9 w-9 flex items-center justify-center">
            <button
                className={classNames("text-xl", {"text-accent-600": checked})}
                onClick={() => setChecked(!checked)}
            >
                    {checked ? <RiCheckboxFill/> : <RiCheckboxBlankLine/>}
            </button>
        </div>
    )
}

export default Checkbox
