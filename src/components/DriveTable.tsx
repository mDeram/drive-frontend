import React from "react";
import Download from "./Download";
import DriveItem from "./DriveItem";

interface DriveItemsProps {
    files: string[];
}

const DriveTable: React.FC<DriveItemsProps> = ({
    files
}) => {
    return (
        <div className="w-full">
            <div className="flex">
                <Download/>
            </div>
            <ul className="">
                {files.map(file => <DriveItem key={file} name={file} />)}
            </ul>
        </div>
    )
}

export default DriveTable
