import React from "react";
import { useRmMutation } from "../generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";
import { AnyDirectoryItem } from "../types";
import getDriveItemPath from "../utils/getDriveItemPath";

interface DeleteProps {
    path: string;
    items: AnyDirectoryItem[];
}

const Delete: React.FC<DeleteProps> = ({
    path,
    items
}) => {
    const [,rmFile] = useRmMutation();
    if (!items.length) return null;

    function rm() {
        rmFile({ paths: items.map(item => getDriveItemPath(path, item)!) });
    }

    return (
        <button className="btn flex items-center" onClick={rm}>
            <AiOutlineDelete className="text-accent-600"/>
            Delete
        </button>
    )
}

export default Delete
