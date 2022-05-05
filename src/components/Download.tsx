import React from "react";

interface DownloadProps {
    names: string[];
    path: string;
}

const Download: React.FC<DownloadProps> = ({
    names,
    path
}) => {
    if (!names.length) return null;

    return (
        <a className="bg-green-600" href={`http://localhost:8000/download${path}${names}`} download>Download</a>
    )
}

export default Download
