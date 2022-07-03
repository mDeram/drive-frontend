import { useAtomValue } from "jotai";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { pathAtom } from "../atoms/path";
import { useDownloadLinkMutation } from "../generated/graphql";
import { AnyDirectoryItem } from "../types";
import { getApiDownloadSrc } from "../utils/getApiSrc";
import getDriveItemPath from "../utils/getDriveItemPath";

interface DownloadProps {
    items: AnyDirectoryItem[];
}

const Download: React.FC<DownloadProps> = ({
    items
}) => {
    const [,downloadLink] = useDownloadLinkMutation();
    const path = useAtomValue(pathAtom);
    if (!items.length) return null;

    async function handleClick() {
        const result = await downloadLink({ paths: items.map(item => getDriveItemPath(path, item)!) });
        const link = result.data?.downloadLink;
        if (!link) return;

        /*const downloadb = (
            <a className="btn flex items-center"
                download
            ></a>
        )*/

        const a = document.createElement("a");
        a.href = getApiDownloadSrc(link);

        if (items.length > 1)                   a.setAttribute("download", "Drive.zip");
        else if (items[0].type === "folder")    a.setAttribute("download", items[0].name + ".zip");
        else                                    a.setAttribute("download", items[0].name);

        document.body.appendChild(a);
        a.click();
        a.parentNode!.removeChild(a);
    }

    return (
        /*<a className="btn flex items-center"
            href={getApiDownloadSrc(path, getDownloadName())}
            download
        ></a>*/
        <button className="btn flex items-center" onClick={handleClick}>
            <AiOutlineDownload className="text-accent-600"/>
            Download
        </button>
    )
}

export default Download
