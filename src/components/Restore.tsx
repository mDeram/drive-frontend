import React from "react";
import { useRestoreMutation } from "../generated/graphql";
import pathLib from "path";
import { MdRestore } from "react-icons/md";

interface RestoreProps {
    path: string;
    names: string[];
}

const Restore: React.FC<RestoreProps> = ({
    path,
    names
}) => {
    const [,restoreFile] = useRestoreMutation();
    if (!names.length) return null;

    function restore() {
        restoreFile({ paths: names.map(name => pathLib.join(path, name)) });
    }

    return (
        <button className="btn flex items-center" onClick={restore}>
            <MdRestore className="text-accent-600"/>
            Restore
        </button>
    )
}

export default Restore
