import React from "react";
import CheckboxAll from "./CheckboxAll";

interface DriveTableHeadProps {
    checked: boolean;
    selectAll: () => void;
    clearSelected: () => void;
}

const DriveTableHead: React.FC<DriveTableHeadProps> = ({
    checked,
    selectAll,
    clearSelected
}) => {
    return (
        <thead className="border-b shadow-md z-[1]">
            <tr>
                <th className="table-cell">
                    <CheckboxAll checked={checked} selectAll={selectAll} clearSelected={clearSelected}/>
                </th>
                <th className="table-cell text-left">Name</th>
            </tr>
        </thead>
    );
}

export default DriveTableHead;

