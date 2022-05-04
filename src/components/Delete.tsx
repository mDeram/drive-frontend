import React from "react";
import { useRmMutation } from "../generated/graphql";
import pathLib from "path";

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
        <button className="bg-blue-600" onClick={rm}>Delete</button>
    )
}

export default Delete
