import classNames from "classnames";
import React from "react";
import { AiFillFile, AiFillFolder } from "react-icons/ai";
import Checkbox from "./Checkbox";

interface DriveItemProps {
    name: string;
    type: string;
    checked: boolean | undefined;
    handleChange: (value: boolean) => void;
    changePath: (value: string) => void;
}

const DriveItem: React.FC<DriveItemProps> = ({
    name,
    type,
    checked,
    handleChange,
    changePath
}) => {
    function handleClick() {
        if (type === "folder") changePath(`${name}/`);
    }

    return (
        <li className="flex border-b items-center">
            <Checkbox checked={checked} handleChange={handleChange}/>
            <div className={classNames("flex items-center grow", {
                "cursor-pointer": type === "folder",
                "hover:bg-gray-300": type === "folder"
                })}
                onClick={handleClick}
            >
                {type === "file" ? <AiFillFile/> : <AiFillFolder/>}
                {name}
            </div>
        </li>
    )
}

export default DriveItem
