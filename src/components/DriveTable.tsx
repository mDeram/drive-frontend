import React from "react";
import DriveTableBody from "./DriveTableBody";
import DriveTableHead from "./DriveTableHead";
import { AnyDirectoryItem } from "../types";

interface DriveTableProps {
    path: string;
    lsData: AnyDirectoryItem[] | undefined;
    selected: Set<AnyDirectoryItem>;
    items: AnyDirectoryItem[];
    appendPath: (value: string) => void;
    changeChecked: (item: AnyDirectoryItem) => (value: boolean) => void;
    checked: boolean;
    selectAll: () => void;
    clearSelected: () => void;
}

const DriveTable: React.FC<DriveTableProps> = ({
    path,
    lsData,
    selected,
    appendPath,
    changeChecked,
    checked,
    selectAll,
    clearSelected
}) => {
    return (
        <table className="flex flex-col min-h-0 table-auto">
            <DriveTableHead checked={checked} selectAll={selectAll} clearSelected={clearSelected}/>
            <DriveTableBody
                path={path}
                lsData={lsData}
                selected={selected}
                changeChecked={changeChecked}
                appendPath={appendPath}
            />
        </table>
    );
}

export default DriveTable;
