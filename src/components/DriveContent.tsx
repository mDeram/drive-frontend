import React, { useEffect, useState } from "react";
import { DirectoryItem } from '../generated/graphql'
import Path from "./Path";
import Actions from "./Actions";
import DriveTable from "./DriveTable";
import useListItems from "../hooks/useListItems";

interface DriveContentProps {
    path: string;
    appendPath: (path: string) => void;
    setPath: (newPath: string) => void;
    searchResults: DirectoryItem[] | undefined;
    searchFetching: boolean;
}

const DriveContent: React.FC<DriveContentProps> = ({
    path,
    appendPath,
    setPath,
    searchResults,
    searchFetching
}) => {
    const lsData = useListItems(path, searchResults, searchFetching);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const selectedEntries = Array.from(selected).filter(value => lsData?.map(item => item.name).includes(value));

    function handleChangeChecked(name: string) {
        return (value: boolean) => {
            setSelected(prev => {
                const next = new Set(prev);
                if (value)  next.add(name);
                else        next.delete(name);

                return next;
            });
        }
    }

    function selectAll() {
        setSelected(new Set(lsData?.map(item => item.name)));
    }

    function clearSelected() {
        setSelected(new Set());
    }

    function isSelectedAll() {
        return selected.size > 0 && selected.size === lsData?.length;
    }

    useEffect(() => {
        clearSelected();
    }, [path]);

    return (
        <section className="flex flex-col w-full shadow-2xl">
            <Actions path={path} selectedEntries={selectedEntries} lsData={lsData}/>
            <Path path={path} setPath={setPath}/>
            <DriveTable
                path={path}
                lsData={lsData}
                selected={selected}
                changeChecked={handleChangeChecked}
                appendPath={appendPath}
                checked={isSelectedAll()}
                selectAll={selectAll}
                clearSelected={clearSelected}
            />
        </section>
    )
}

export default DriveContent;
