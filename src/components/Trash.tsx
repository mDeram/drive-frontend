import React from "react";
import { useTrashMutation } from "../generated/graphql";
import pathLib from "path";
import { AiOutlineDelete } from "react-icons/ai";

interface TrashProps {
    path: string;
    names: string[];
}

const Trash: React.FC<TrashProps> = ({
    path,
    names
}) => {
    const [,trashFile] = useTrashMutation();
    if (!names.length) return null;

    function trash() {
        trashFile({ paths: names.map(name => pathLib.join(path, name)) });
    }

    return (
        <button className="btn flex items-center" onClick={trash}>
            <AiOutlineDelete className="text-accent-600"/>
            Delete
        </button>
    )
}

export default Trash
