import React, { useEffect, useState } from "react";
import Download from "./Download";
import DriveItem from "./DriveItem";
import Upload from "./Upload";
import { useLsQuery } from '../generated/graphql'
import Delete from "./Delete";
import Create from "./Create";
import pathLib from "path";
import Path from "./Path";
import { RiCheckboxBlankLine } from "react-icons/ri";
import CheckboxAll from "./CheckboxAll";
import Trash from "./Trash";

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

    function selectAll() {
        setSelected(new Set(data?.ls.map(item => item.name)));
    }

    function clearSelected() {
        setSelected(new Set());
    }

    function isSelectedAll() {
        return selected.size > 0 && selected.size === data?.ls.length;
    }

    function appendPath(value: string) {
        setPath(prev => pathLib.join(prev, value));
    }

    function setPathWrapper(newPath: string) {
        setPath(newPath);
    }

    useEffect(() => {
        clearSelected();
        window.scrollTo(0, 0);
    }, [path]);

    return (
        <section className="flex flex-col w-full">
            <div className="flex border-b">
                <Upload path={path}/>
                <Create path={path}/>
                <Download path={path} names={selectedEntries} lsData={data?.ls}/>
                {path.startsWith("/trash")
                    ? <Delete path={path} names={selectedEntries}/>
                    : <Trash path={path} names={selectedEntries}/>
                }
            </div>
            <Path path={path} setPath={setPathWrapper}/>
            <table className="table-auto">
                <thead className="border-b">
                    <tr>
                        <th className="table-cell">
                            <CheckboxAll checked={isSelectedAll()} selectAll={selectAll} clearSelected={clearSelected}/>
                        </th>
                        <th className="table-cell text-left">Name</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto bg-primary-50">
                    {data?.ls.map(item => (
                        <DriveItem
                            key={item.name} name={item.name} type={item.type}
                            checked={selected.has(item.name)}
                            setChecked={handleChange(item.name)}
                            appendPath={appendPath}
                            path={path}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default DriveTable
