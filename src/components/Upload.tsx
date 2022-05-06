import React from "react";
import { useUploadMutation } from "../generated/graphql";
import pathLib from "path";

interface UploadProps {
    path: string
}

const Upload: React.FC<UploadProps> = ({
    path
}) => {
    const [,uploadFile] = useUploadMutation();
    function upload(files: HTMLInputElement["files"]) {
        if (!files) return;
        //TODO show loading
        console.log(files);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            uploadFile({
                path: path,
                additionalPath: pathLib.dirname(file.webkitRelativePath),
                file
            });
        }
    }

    return (
        <>
        <input onChange={e => upload(e.target.files)} type="file" multiple/>
        <input onChange={e => upload(e.target.files)} type="file" webkitdirectory="" directory=""/>
        </>
    )
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

export default Upload
