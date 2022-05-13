import React from "react";
import { DirectoryItem } from "../generated/graphql";
import DriveItem from "./DriveItem";

interface DriveTableBodyProps {
    path: string;
    lsData: DirectoryItem[] | undefined;
    selected: Set<string>;
    appendPath: (value: string) => void;
    changeChecked: (name: string) => (value: boolean) => void;
}

const DriveTableBody: React.FC<DriveTableBodyProps> = ({
    path,
    lsData,
    selected,
    appendPath,
    changeChecked
}) => {
    return (
        <tbody className="shadow-inner overflow-y-auto bg-primary-50">
            {lsData?.map(item => (
                <DriveItem
                    key={item.name} name={item.name} type={item.type}
                    checked={selected.has(item.name)}
                    setChecked={changeChecked(item.name)}
                    appendPath={appendPath}
                    path={path}
                />
            ))}
        </tbody>
    );
}

export default DriveTableBody;
