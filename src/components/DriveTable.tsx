import React, { useEffect, useState } from "react";
import Download from "./Download";
import DriveItem from "./DriveItem";
import Upload from "./Upload";
import { useLsQuery } from '../generated/graphql'
import Delete from "./Delete";
import Create from "./Create";
import pathLib from "path";
import Path from "./Path";

interface DriveItemsProps {
}

const DriveTable: React.FC<DriveItemsProps> = () => {
    const [path, setPath] = useState("/");
    const [{ data, fetching, error }] = useLsQuery({ variables: { path }});
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const selectedEntries = Array.from(selected).filter(value => data?.ls.map(item => item.name).includes(value));

    function handleChange(name: string) {
        return (value: boolean) => {
            setSelected(prev => {
                const next = new Set(prev);
                if (value)  next.add(name);
                else        next.delete(name);

                return next;
            });
        }
    }

    function appendPath(value: string) {
        setPath(prev => pathLib.join(prev, value));
    }

    function setPathWrapper(newPath: string) {
        setPath(newPath);
    }

    useEffect(() => {
        // Clear the selection
        setSelected(new Set());
        window.scrollTo(0, 0);
    }, [path]);

    return (
        <div className="flex flex-col h-screen w-full">
            <Path path={path} setPath={setPathWrapper}/>
            <div className="flex">
                <Upload path={path}/>
                <Create path={path}/>
                <Download path={path} names={selectedEntries} lsData={data?.ls}/>
                <Delete path={path} names={selectedEntries}/>
            </div>
            <ul className="overflow-y-auto bg-primary-50 grow">
                {data?.ls.map(item => (
                    <DriveItem
                        key={item.name} name={item.name} type={item.type}
                        checked={selected.has(item.name)}
                        setChecked={handleChange(item.name)}
                        appendPath={appendPath}
                        path={path}
                    />
                ))}
            </ul>
        </div>
    )
}

export default DriveTable
