import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { usePathContext } from "../contexts/Path";
import { AnyDirectoryItem } from "../types";
import { getApiDownloadSrc } from "../utils/getApiSrc";

interface DownloadProps {
    items: AnyDirectoryItem[];
}

const Download: React.FC<DownloadProps> = ({
    items
}) => {
    const { path } = usePathContext();
    if (!items.length) return null;

    function getDownloadName() {
        //TODO support download of multiple items
        const item = items[0];
        if (item.type !== "folder") return item.name;
        return item.name + ".zip?folder=true";
    }

    return (
        <a className="btn flex items-center"
            href={getApiDownloadSrc(path, getDownloadName())}
            download
        >
            <AiOutlineDownload className="text-accent-600"/>
            Download
        </a>
    )
}

export default Download
