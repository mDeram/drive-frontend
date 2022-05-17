import React from "react";
import DriveTableBody from "./DriveTableBody";
import DriveTableHead from "./DriveTableHead";
import { AnyDirectoryItem } from "../types";

interface DriveTableProps {
    lsData: AnyDirectoryItem[] | undefined;
    selected: Set<AnyDirectoryItem>;
    items: AnyDirectoryItem[];
    changeChecked: (item: AnyDirectoryItem) => (value: boolean) => void;
    checked: boolean;
    selectAll: () => void;
    clearSelected: () => void;
}

const DriveTable: React.FC<DriveTableProps> = ({
    lsData,
    selected,
    changeChecked,
    checked,
    selectAll,
    clearSelected
}) => {
    return (
        <table className="flex flex-col min-h-0 table-auto">
            <DriveTableHead checked={checked} selectAll={selectAll} clearSelected={clearSelected}/>
            <DriveTableBody
                lsData={lsData}
                selected={selected}
                changeChecked={changeChecked}
            />
        </table>
    );
}

export default DriveTable;
