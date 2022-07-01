import React, { useEffect, useState } from "react";
import Path from "./Path";
import Actions from "./Actions";
import DriveTable from "./DriveTable";
import useListItems from "../hooks/useListItems";
import { SearchDirectoryItem } from "../generated/graphql";
import { AnyDirectoryItem } from "../types";
import EmptyData from "./EmptyData";
import FetchingData from "./FetchingData";
import { usePathContext } from "../contexts/Path";

interface DriveContentProps {
    searchResults: SearchDirectoryItem[] | undefined;
    searchFetching: boolean;
}

const DriveContent: React.FC<DriveContentProps> = ({
    searchResults,
    searchFetching
}) => {
    const { path } = usePathContext();
    const { lsData, fetching } = useListItems(path, searchResults, searchFetching);
    const [selected, setSelected] = useState<Set<AnyDirectoryItem>>(new Set());
    const selectedItems = Array.from(selected);

    function handleChangeChecked(item: AnyDirectoryItem) {
        return (value: boolean) => {
            setSelected(prev => {
                const next = new Set(prev);
                if (value)  next.add(item);
                else        next.delete(item);

                return next;
            });
        }
    }

    function selectAll() {
        setSelected(new Set(lsData));
    }

    function clearSelected() {
        setSelected(new Set());
    }

    function isSelectedAll() {
        return selected.size > 0 && selected.size === lsData?.length;
    }

    useEffect(() => {
        clearSelected();
    }, [lsData]);

    function renderTable() {
        if (fetching) {
            return <FetchingData/>;
        }

        if (!lsData?.length) {
            return <EmptyData/>;
        }

        return (
            <DriveTable
                lsData={lsData}
                selected={selected}
                items={selectedItems}
                changeChecked={handleChangeChecked}
                checked={isSelectedAll()}
                selectAll={selectAll}
                clearSelected={clearSelected}
            />
        )
    }

    return (
        <section className="flex flex-col w-full shadow-2xl overflow-hidden">
            <Actions allItems={lsData || []} items={selectedItems}/>
            <Path/>
            {renderTable()}
        </section>
    )
}

export default DriveContent;
