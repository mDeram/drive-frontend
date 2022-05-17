import classNames from "classnames";
import React from "react";
import { AnyDirectoryItem } from "../types";
import Checkbox from "./Checkbox";
import DriveItemFile from "./DriveItemFile";
import DriveItemFolder from "./DriveItemFolder";

interface DriveItemProps {
    item: AnyDirectoryItem;
    checked: boolean | undefined;
    setChecked: (value: boolean) => void;
}

const DriveItem: React.FC<DriveItemProps> = ({
    item,
    checked,
    setChecked
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
                {item.type === "folder"
                    ? <DriveItemFolder item={item}/>
                    : <DriveItemFile item={item}/>
                }
            </td>
        </tr>
    )
}

export default DriveItem
