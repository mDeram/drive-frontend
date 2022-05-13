import React from "react";
import { useRestoreMutation } from "../generated/graphql";
import { MdRestore } from "react-icons/md";
import { AnyDirectoryItem } from "../types";
import getDriveItemPath from "../utils/getDriveItemPath";

interface RestoreProps {
    path: string;
    items: AnyDirectoryItem[];
}

const Restore: React.FC<RestoreProps> = ({
    path,
    items
}) => {
    const [,restoreFile] = useRestoreMutation();
    if (!items.length) return null;

    function restore() {
        const paths = items
            .filter(item => item.__typename === "TrashDirectoryItem")
            .map(item => getDriveItemPath(path, item )!);

        restoreFile({ paths });
    }

    return (
        <button className="btn flex items-center" onClick={restore}>
            <MdRestore className="text-accent-600"/>
            Restore
        </button>
    )
}

export default Restore
