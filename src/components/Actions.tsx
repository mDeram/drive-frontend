import React from "react"
import Trash from "./Trash";
import Restore from "./Restore";
import Delete from "./Delete";
import Create from "./Create";
import Download from "./Download";
import Upload from "./Upload";
import { AnyDirectoryItem } from "../types";

interface ActionsProps {
    path: string;
    items: AnyDirectoryItem[];
}

const Actions: React.FC<ActionsProps> = ({
    path,
    items
}) => {
    function renderActions() {
        if (path.startsWith("/files")) {
            return (
                <>
                <Upload path={path}/>
                <Create path={path}/>
                <Download path={path} items={items}/>
                <Trash path={path} items={items}/>
                </>
            )
        }
        if (path.startsWith("/trash")) {
            //TODO trashAll
            return (
                <>
                <Delete path={path} items={items}/>
                <Restore path={path} items={items}/>
                </>
            )
        }
        if (path.startsWith("/search")) {
            return (
                <>
                <Download path={path} items={items}/>
                <Trash path={path} items={items}/>
                </>
            )
        }
    }

    return (
        <div className="flex border-b">
            {renderActions()}
        </div>
    );
}

export default Actions;
