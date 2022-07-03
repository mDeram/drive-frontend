import React, { MouseEvent } from "react";
import { AiFillFolder } from "react-icons/ai";
import { AnyDirectoryItem } from "../types";
import pathLib from "path";
import { useSetAtom } from "jotai";
import { appendPathAtom, pathAtom } from "../atoms/path";

interface DriveItemFolderProps {
    item: AnyDirectoryItem;
}

const DriveItemFolder: React.FC<DriveItemFolderProps> = ({
    item,
}) => {
    const setPath = useSetAtom(pathAtom);
    const appendPath = useSetAtom(appendPathAtom);

    function isOpenable() {
        return item.__typename === "DirectoryItem"
            || item.__typename === "SearchDirectoryItem";
    }

    function handleOpen(e: MouseEvent) {
        e.stopPropagation();
        if (item.__typename === "DirectoryItem") appendPath(item.name);
        if (item.__typename === "SearchDirectoryItem") setPath(pathLib.join(item.path, item.name));
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
