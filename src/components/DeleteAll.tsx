import React from "react";
import { useRmMutation } from "../generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";
import { AnyDirectoryItem } from "../types";
import getDriveItemPath from "../utils/getDriveItemPath";
import { useAtomValue } from "jotai";
import { pathAtom } from "../atoms/path";

interface DeleteAllProps {
    allItems: AnyDirectoryItem[];
}

const DeleteAll: React.FC<DeleteAllProps> = ({
    allItems: items
}) => {
    const path = useAtomValue(pathAtom);
    const [,rmFile] = useRmMutation();
    if (!items.length) return null;

    function rm() {
        rmFile({ paths: items.map(item => getDriveItemPath(path, item)!) });
    }

    return (
        <button className="btn flex items-center" onClick={rm}>
            <AiOutlineDelete className="text-accent-600"/>
            Empty Trash
        </button>
    )
}

export default DeleteAll
