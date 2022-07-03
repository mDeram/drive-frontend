import React from "react"
import Trash from "./Trash";
import Restore from "./Restore";
import Delete from "./Delete";
import Create from "./Create";
import Download from "./Download";
import Upload from "./Upload";
import { AnyDirectoryItem } from "../types";
import DeleteAll from "./DeleteAll";
import { useAtomValue } from "jotai";
import { pathAtom } from "../atoms/path";

interface ActionsProps {
    allItems: AnyDirectoryItem[];
    items: AnyDirectoryItem[];
}

const Actions: React.FC<ActionsProps> = ({
    allItems,
    items
}) => {
    const path = useAtomValue(pathAtom);

    function renderActions() {
        if (path.startsWith("/files")) {
            return (
                <>
                <Upload/>
                <Create allItems={allItems}/>
                <Download items={items}/>
                <Trash items={items}/>
                </>
            )
        }
        if (path.startsWith("/trash")) {
            return (
                <>
                <DeleteAll allItems={allItems}/>
                <Delete items={items}/>
                <Restore items={items}/>
                </>
            )
        }
        if (path.startsWith("/search")) {
            return (
                <>
                <Download items={items}/>
                <Trash items={items}/>
                </>
            )
        }
    }

    return (
        <div className="flex border-b shrink-0 h-9">
            {renderActions()}
        </div>
    );
}

export default Actions;
