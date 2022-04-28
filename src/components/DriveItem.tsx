import React, { useState } from "react";
import { AiFillFile } from "react-icons/ai";
import Checkbox from "./Checkbox";

interface DriveItemProps {
    name: string;
}

const DriveItem: React.FC<DriveItemProps> = ({
    name
}) => {
    const [checked, setChecked] = useState(false);

    return (
        <li className="flex border-b items-center">
            <Checkbox checked={checked} handleChange={setChecked}/>
            <AiFillFile/>
            {name}
        </li>
    )
}

export default DriveItem
