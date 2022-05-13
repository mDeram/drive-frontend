import React from "react";
import { useTrashMutation } from "../generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";
import { AnyDirectoryItem } from "../types";
import getDriveItemPath from "../utils/getDriveItemPath";

interface TrashProps {
    path: string;
    items: AnyDirectoryItem[];
}

const Trash: React.FC<TrashProps> = ({
    path,
    items
}) => {
    const [,trashFile] = useTrashMutation();
    if (!items.length) return null;

    function trash() {
        const paths = items
            .filter(item => item.__typename !== "TrashDirectoryItem")
            .map(item => getDriveItemPath(path, item)!);
        trashFile({ paths });
    }

    return (
        <button className="btn flex items-center" onClick={trash}>
            <AiOutlineDelete className="text-accent-600"/>
            Delete
        </button>
    )
}

export default Trash
