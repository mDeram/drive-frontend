import axios from "axios";
import React from "react";
import { useUploadMutation } from "../generated/graphql";

interface UploadProps {
}

const Upload: React.FC<UploadProps> = ({
}) => {
    const [,uploadFile] = useUploadMutation();
    function upload(files: HTMLInputElement["files"]) {
        if (!files) return;
        uploadFile({ file: files[0] });
    }

    return (
        <input onChange={e => upload(e.target.files)} type="file"/>
    )
}

export default Upload
