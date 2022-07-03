import React from "react";
import { useRmMutation } from "../generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";
import { AnyDirectoryItem } from "../types";
import getDriveItemPath from "../utils/getDriveItemPath";
import { useAtomValue } from "jotai";
import { pathAtom } from "../atoms/path";
import { useNotificationContext } from "../contexts/Notification";
import SimpleNotification from "./SimpleNotification";

interface DeleteProps {
    items: AnyDirectoryItem[];
}

const Delete: React.FC<DeleteProps> = ({
    items
}) => {
    const { pushNotificationDefault } = useNotificationContext()!;
    const path = useAtomValue(pathAtom);
    const [,rmFile] = useRmMutation();
    if (!items.length) return null;

    async function rm() {
        const result = await rmFile({ paths: items.map(item => getDriveItemPath(path, item)!) });
        if (result.data && !result.data.rm)
            pushNotificationDefault(<SimpleNotification type="error" text="Could not delete files"/>);
    }

    return (
        <button className="btn flex items-center" onClick={rm}>
            <AiOutlineDelete className="text-accent-600"/>
            Delete
        </button>
    )
}

export default Delete
