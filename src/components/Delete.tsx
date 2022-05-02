import React from "react";
import { useRmMutation } from "../generated/graphql";

interface DeleteProps {
    name?: string;
}

const Delete: React.FC<DeleteProps> = ({
    name
}) => {
    const [,rmFile] = useRmMutation();
    if (!name) return null;

    function rm() {
        rmFile({ paths: [name!] });
    }

    return (
        <button className="bg-blue-600" onClick={rm}>Delete</button>
    )
}

export default Delete
