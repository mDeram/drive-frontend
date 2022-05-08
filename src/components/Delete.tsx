import React from "react";
import { useRmMutation } from "../generated/graphql";
import pathLib from "path";
import { AiOutlineDelete } from "react-icons/ai";

interface DeleteProps {
    path: string;
    names: string[];
}

const Delete: React.FC<DeleteProps> = ({
    path,
    names
}) => {
    const [,rmFile] = useRmMutation();
    if (!names.length) return null;

    function rm() {
        rmFile({ paths: names.map(name => pathLib.join(path, name)) });
    }

    return (
        <button className="btn flex items-center" onClick={rm}>
            <AiOutlineDelete className="text-accent-600"/>
            Delete
        </button>
    )
}

export default Delete
