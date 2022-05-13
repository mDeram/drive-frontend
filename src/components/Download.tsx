import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { AnyDirectoryItem } from "../types";

interface DownloadProps {
    items: AnyDirectoryItem[];
    path: string;
}

const Download: React.FC<DownloadProps> = ({
    items,
    path
}) => {
    if (!items.length) return null;

    function getDownloadName() {
        //TODO support download of multiple items
        const item = items[0];
        if (item.type !== "folder") return item.name;
        return item.name + ".zip?folder=true";
    }

    //TODO change path like this to const path or helper functions
    return (
        <a className="btn flex items-center"
            href={`${process.env.NEXT_PUBLIC_API}/fs/download${path}/${getDownloadName()}`}
            download
        >
            <AiOutlineDownload className="text-accent-600"/>
            Download
        </a>
    )
}

export default Download
