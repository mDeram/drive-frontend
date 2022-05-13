import React, { useEffect, useRef } from "react";
import { AnyDirectoryItem } from "../types";
import getDriveItemPath from "../utils/getDriveItemPath";
import DriveItem from "./DriveItem";

interface DriveTableBodyProps {
    path: string;
    lsData: AnyDirectoryItem[] | undefined;
    selected: Set<AnyDirectoryItem>;
    appendPath: (value: string) => void;
    changeChecked: (item: AnyDirectoryItem) => (value: boolean) => void;
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
                    key={getDriveItemPath(path, item)}
                    item={item}
                    checked={selected.has(item)}
                    setChecked={changeChecked(item)}
                    appendPath={appendPath}
                    path={path}
                />
            ))}
        </tbody>
    );
}

export default DriveTableBody;
