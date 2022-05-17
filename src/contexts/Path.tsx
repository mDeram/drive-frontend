import { createContext, useContext, useState } from "react";
import pathLib from "path";

export type PathContextType = {
    path: string;
    setPath: (newPath: string) => void;
    appendPath: (value: string) => void;
}

export const PathContext = createContext<PathContextType | null>(null);

export const PathProvider: React.FC = ({
    children
}) => {
    const [path, setPath] = useState("/files");

    function appendPath(value: string) {
        setPath(prev => pathLib.join(prev, value));
    }

    function setPathWrapper(newPath: string) {
        setPath(newPath);
    }

    return (
        <PathContext.Provider value={{path, setPath: setPathWrapper, appendPath}}>
            {children}
        </PathContext.Provider>
    )
}

export const usePathContext = () => {
    return useContext(PathContext) as PathContextType;
};
