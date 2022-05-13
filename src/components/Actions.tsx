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
    return (
        <div className="flex border-b">
            <Upload path={path}/>
            <Create path={path}/>
            <Download path={path} items={items}/>
            {path.startsWith("/trash") && <Restore path={path} items={items}/>}
            {path.startsWith("/trash")
                ? <Delete path={path} items={items}/>
                : <Trash path={path} items={items}/>
            }
        </div>
    );
}

export default Actions;
