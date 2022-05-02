import React, { useState } from "react";
import Download from "./Download";
import DriveItem from "./DriveItem";
import Upload from "./Upload";
import { useLsQuery } from '../generated/graphql'

interface DriveItemsProps {
}

const DriveTable: React.FC<DriveItemsProps> = () => {
    const [{ data, fetching, error }, reQueryFiles] = useLsQuery();
    const [selected, setSelected] = useState("");

    function handleChange(name: string) {
        return (value: boolean) => {
            if (value)
                setSelected(name);
            else
                setSelected("");
        }
    }

    return (
        <div className="w-full">
            <div className="flex">
                <Upload/>
                <Download name={selected}/>
            </div>
            <ul className="">
                {data?.ls.map((file: string) => (
                    <DriveItem
                        key={file} name={file}
                        checked={selected === file}
                        handleChange={handleChange(file)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default DriveTable
