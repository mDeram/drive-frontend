import React, { useState } from "react";
import pathLib from "path";
import { AiOutlineCloudUpload } from "react-icons/ai";
import useOuterClick from "../hooks/useOuterClick";
import { UploadContextType, useUploadContext } from "../contexts/Upload";

interface UploadProps {
    path: string
}

const Upload: React.FC<UploadProps> = ({
    path
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useOuterClick(() => setShowDropdown(false), showDropdown);
    const { pushUploads } = useUploadContext() as UploadContextType;

    function upload(files: HTMLInputElement["files"]) {
        if (!files) return;

        const toUpload = Array.from(files).map(file => ({
            path,
            additionalPath: pathLib.dirname(file.webkitRelativePath || ""),
            file
        }));

        pushUploads(toUpload);
    }

    return (
        <div className="relative">
            <button className="btn flex items-center" onClick={() => setShowDropdown(prev => !prev)}>
                <AiOutlineCloudUpload className="text-accent-600"/>
                Import
            </button>
            {showDropdown &&
                <div className="flex flex-col absolute top-full w-full border" ref={ref as any}>
                    <label className="btn" htmlFor="upload-files" tabIndex={0}>Files</label>
                    <input className="hidden" id="upload-files" onChange={e => upload(e.target.files)} type="file" multiple/>
                    <label className="btn" htmlFor="upload-folder" tabIndex={0}>Folder</label>
                    <input className="hidden" id="upload-folder" onChange={e => upload(e.target.files)} type="file" webkitdirectory="" directory=""/>
                </div>
            }
        </div>
    )
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

export default Upload
