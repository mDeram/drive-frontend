import React from "react";
import pathLib from "path";
import { useAtom } from "jotai";
import { pathAtom } from "../atoms/path";

const Path: React.FC = () => {
    const [path, setPath] = useAtom(pathAtom);

    function rename(name: string) {
        if (name === "files") return "My Files";
        if (name === "trash") return "Trash";
        if (name === "search") return "Search";
        return "Error";
    }

    function renderPathButtons() {
        const pathParts = path.split("/");
        pathParts.shift();

        const result: JSX.Element[] = [];

        const getSetPathCb = (value: string) => {
            return () => setPath(value);
        }

        let totalPath = "/";
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            totalPath = pathLib.join(totalPath, part);
            const isLast = i === pathParts.length - 1;
            const isFirst = i === 0;

            const name = isFirst ? rename(part) : part;

            if (isLast) {
                result.push(<li key={totalPath}>{name}</li>);
            } else {
                result.push(
                    <li
                        key={totalPath}
                        className="cursor-pointer hover:underline text-black/50"
                        onClick={getSetPathCb(totalPath)}
                    >{name}</li>
                );
            }

            if (!isLast)
                result.push(<li key={totalPath + "/"} className="mx-5">/</li>);
        }

        return result;
    }

    return (
        <div className="flex list-none m-5 text-xl">
            {renderPathButtons()}
        </div>
    )
}

export default Path
