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
        <tr className={classNames("h-12 border-b", {
                "hover:bg-secondary-200": !checked,
                "bg-secondary-300": checked
            })}
            onClick={() => setChecked(!checked)}
        >
            <td>
                <Checkbox checked={checked}/>
            </td>
            <td>
                {type === "folder"
                    ? <DriveItemFolder appendPath={appendPath} name={name}/>
                    : <DriveItemFile path={path} name={name}/>
                }
            </td>
        </tr>
    )
}

export default DriveItem
