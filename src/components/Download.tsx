import React from "react";
import { DirectoryItem } from "../generated/graphql";

interface DownloadProps {
    names: string[];
    path: string;
    lsData: DirectoryItem[] | undefined;
}

const Download: React.FC<DownloadProps> = ({
    names,
    path,
    lsData
}) => {
    if (!names.length || !lsData) return null;

    function getDownloadName(name: string) {
        const item = lsData!.find(({ name: currentName }) => name === currentName);
        if (item?.type === "folder")
            return item.name + ".zip?folder=true";
        return item?.name;
    }

    return (
        <a className="bg-green-600" href={`http://localhost:8000/download${path}${getDownloadName(names[0])}`} download>Download</a>
    )
}

export default Download
