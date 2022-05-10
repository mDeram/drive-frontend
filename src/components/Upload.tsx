import React, { useState } from "react";
import { useUploadMutation } from "../generated/graphql";
import pathLib from "path";
import { AiOutlineCloudUpload } from "react-icons/ai";
import useOuterClick from "../hooks/useOuterClick";

interface UploadProps {
    path: string
}

const Upload: React.FC<UploadProps> = ({
    path
}) => {
    const [,uploadFile] = useUploadMutation();
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useOuterClick(() => setShowDropdown(false), showDropdown);

    function upload(files: HTMLInputElement["files"]) {
        if (!files) return;
        //TODO show loading
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            uploadFile({
                path: path,
                additionalPath: pathLib.dirname(file.webkitRelativePath || ""),
                file
            });
        }
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
