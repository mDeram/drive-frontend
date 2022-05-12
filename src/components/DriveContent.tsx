import React, { useState } from "react";
import { useLsQuery } from '../generated/graphql'
import Path from "./Path";
import Actions from "./Actions";
import DriveTable from "./DriveTable";

interface DriveContentProps {
    path: string;
    appendPath: (path: string) => void;
    setPath: (newPath: string) => void;
}

const DriveContent: React.FC<DriveContentProps> = ({
    path,
    appendPath,
    setPath
}) => {
    const [{ data, fetching, error }] = useLsQuery({ variables: { path }});
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const selectedEntries = Array.from(selected).filter(value => data?.ls.map(item => item.name).includes(value));

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
        setSelected(new Set(data?.ls.map(item => item.name)));
    }

    function clearSelected() {
        setSelected(new Set());
    }

    function isSelectedAll() {
        return selected.size > 0 && selected.size === data?.ls.length;
    }

    return (
        <section className="flex flex-col w-full">
            <Actions path={path} selectedEntries={selectedEntries} lsData={data?.ls}/>
            <Path path={path} setPath={setPath}/>
            <DriveTable
                path={path}
                lsData={data?.ls}
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
