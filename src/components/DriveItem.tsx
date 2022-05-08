import classNames from "classnames";
import React from "react";
import Checkbox from "./Checkbox";
import DriveItemFile from "./DriveItemFile";
import DriveItemFolder from "./DriveItemFolder";

interface DriveItemProps {
    name: string;
    type: string;
    checked: boolean | undefined;
    setChecked: (value: boolean) => void;
    appendPath: (value: string) => void;
    path: string;
}

const DriveItem: React.FC<DriveItemProps> = ({
    name,
    type,
    checked,
    setChecked,
    appendPath,
    path
}) => {
    return (
        <li className={classNames("h-12 flex border-b items-center", {
                "hover:bg-secondary-200": !checked,
                "bg-secondary-300": checked
            })}
            onClick={() => setChecked(!checked)}
        >
            <Checkbox checked={checked} setChecked={() => {}}/>
            {type === "folder"
                ? <DriveItemFolder appendPath={appendPath} name={name}/>
                : <DriveItemFile path={path} name={name}/>
            }
        </li>
    )
}

export default DriveItem
