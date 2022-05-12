import { useState } from "react";
import pathLib from "path";

const usePath: () => [string, (value: string) => void, (newPath: string) => void] = () => {
    const [path, setPath] = useState("/files");

    function appendPath(value: string) {
        setPath(prev => pathLib.join(prev, value));
    }

    function setPathWrapper(newPath: string) {
        setPath(newPath);
    }

    return [path, appendPath, setPathWrapper];
}

export default usePath;
