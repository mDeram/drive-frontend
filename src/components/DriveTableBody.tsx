import React, { useEffect, useRef } from "react";
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
    const ref = useRef<HTMLTableSectionElement>(null);

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
    }, [path]);

    return (
        <tbody ref={ref} className="shadow-inner overflow-y-auto bg-primary-50">
            {lsData?.map(item => (
                <DriveItem
                    name={item.name} type={item.type}
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
