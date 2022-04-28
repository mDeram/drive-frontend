import React from "react";

interface DownloadProps {
    name?: string;
}

const Download: React.FC<DownloadProps> = ({
    name
}) => {
    if (!name) return null;

    return (
        <a href={`files/${name}`} download>Download</a>
    )
}

export default Download
