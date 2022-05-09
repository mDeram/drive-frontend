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
        <div className={classNames("table-row h-12", {
                "hover:bg-secondary-200": !checked,
                "bg-secondary-300": checked
            })}
            onClick={() => setChecked(!checked)}
        >
            <div className="table-cell">
                <Checkbox checked={checked}/>
            </div>
            <div className="table-cell">
                {type === "folder"
                    ? <DriveItemFolder appendPath={appendPath} name={name}/>
                    : <DriveItemFile path={path} name={name}/>
                }
            </div>
        </div>
    )
}

export default DriveItem
