import React from "react";

interface DownloadProps {
    names: string[];
}

const Download: React.FC<DownloadProps> = ({
    names
}) => {
    if (!names.length) return null;

    return (
        null
        //<a className="bg-green-600" href={`files/${names}`} download>Download</a>
    )
}

export default Download
