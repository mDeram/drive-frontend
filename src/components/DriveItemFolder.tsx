import React from "react";
import { AiFillFolder } from "react-icons/ai";
import { AnyDirectoryItem } from "../types";
import pathLib from "path";

interface DriveItemFolderProps {
    item: AnyDirectoryItem;
    path: string;
    appendPath: (value: string) => void;
}

const DriveItemFolder: React.FC<DriveItemFolderProps> = ({
    item,
    path,
    appendPath
}) => {
    function isOpenable() {
        return path.startsWith("/files") || path.startsWith("/search");
    }

    function handleOpen() {
        /*TODO if (item.__typename === "SearchDirectoryItem")
            setPath(pathLib.join(item.path, item.name));
        else*/
        appendPath(item.name);
    }

    return (
        <div className="flex items-center h-full w-full">
            <AiFillFolder className="text-xl"/>
            {isOpenable()
                ? <p className="hover:cursor-pointer hover:underline" onClick={handleOpen}>{item.name}</p>
                : <p>{item.name}</p>
            }
        </div>
    )
}

export default DriveItemFolder;
