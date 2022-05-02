import React, { useState } from "react";
import { AiFillFile } from "react-icons/ai";
import Checkbox from "./Checkbox";

interface DriveItemProps {
    name: string;
    checked: boolean;
    handleChange: (value: boolean) => void;
}

const DriveItem: React.FC<DriveItemProps> = ({
    name,
    checked,
    handleChange
}) => {
    return (
        <li className="flex border-b items-center">
            <Checkbox checked={checked} handleChange={handleChange}/>
            <AiFillFile/>
            {name}
        </li>
    )
}

export default DriveItem
