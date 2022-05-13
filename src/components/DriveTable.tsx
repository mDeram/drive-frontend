import React, { useEffect } from "react";
import { DirectoryItem } from "../generated/graphql";
import DriveTableBody from "./DriveTableBody";
import DriveTableHead from "./DriveTableHead";
import { ImFileEmpty } from "react-icons/im";

interface DriveTableProps {
    path: string;
    lsData: DirectoryItem[] | undefined;
    selected: Set<string>;
    appendPath: (value: string) => void;
    changeChecked: (name: string) => (value: boolean) => void;
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
    useEffect(() => {
        clearSelected();
        window.scrollTo(0, 0);
    }, [path]);

    //TODO loading state
    if (!lsData?.length) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-xl font-semibold">
                <ImFileEmpty className="text-8xl"/>
                <p className="mt-6">This Folder is empty</p>
            </div>
        );
    }

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
