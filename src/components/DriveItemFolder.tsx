import React from "react";
import { AiFillFolder } from "react-icons/ai";

interface DriveItemFolderProps {
    name: string;
    appendPath: (value: string) => void;
}

const DriveItemFolder: React.FC<DriveItemFolderProps> = ({
    name,
    appendPath
}) => {
    function handleClick() {
        appendPath(name);
    }

    return (
        <div className="flex items-center h-full w-full">
            <AiFillFolder className="text-xl"/>
            <p className="hover:cursor-pointer hover:underline" onClick={handleClick}>{name}</p>
        </div>
    )
}

export default DriveItemFolder;
