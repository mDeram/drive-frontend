import React from "react"
import Trash from "./Trash";
import Restore from "./Restore";
import Delete from "./Delete";
import Create from "./Create";
import Download from "./Download";
import Upload from "./Upload";
import { DirectoryItem } from "../generated/graphql";

interface ActionsProps {
    path: string;
    selectedEntries: string[];
    lsData: DirectoryItem[] | undefined;
}

const Actions: React.FC<ActionsProps> = ({
    path,
    selectedEntries,
    lsData
}) => {
    return (
        <div className="flex border-b">
            <Upload path={path}/>
            <Create path={path}/>
            <Download path={path} names={selectedEntries} lsData={lsData}/>
            {path.startsWith("/trash") && <Restore path={path} names={selectedEntries}/>}
            {path.startsWith("/trash")
                ? <Delete path={path} names={selectedEntries}/>
                : <Trash path={path} names={selectedEntries}/>
            }
        </div>
    );
}

export default Actions;
