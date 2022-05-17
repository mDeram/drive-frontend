import React, { useEffect, useRef } from "react";
import { usePathContext } from "../contexts/Path";
import { AnyDirectoryItem } from "../types";
import getDriveItemPath from "../utils/getDriveItemPath";
import DriveItem from "./DriveItem";

interface DriveTableBodyProps {
    lsData: AnyDirectoryItem[] | undefined;
    selected: Set<AnyDirectoryItem>;
    changeChecked: (item: AnyDirectoryItem) => (value: boolean) => void;
}

const DriveTableBody: React.FC<DriveTableBodyProps> = ({
    lsData,
    selected,
    changeChecked
}) => {
    const { path } = usePathContext();
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
                />
            ))}
        </tbody>
    );
}

export default DriveTableBody;
