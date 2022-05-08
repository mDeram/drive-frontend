import React, { useState } from "react";
import { useMkdirMutation } from "../generated/graphql";
import pathLib from "path";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Popup from "./Popup";

interface CreateProps {
    path: string
}

const Create: React.FC<CreateProps> = ({
    path
}) => {
    const [,createDirectory] = useMkdirMutation();
    const [value, setValue] = useState("");

    function handleCreate() {
        createDirectory({ dirname: pathLib.join(path, value) });
        setValue("");
    }

    function isCreateDisabled(): boolean {
        //TODO check if folder already exists
        return !value.length;
    }

    return (
        <Popup onOpen={() => setValue("")} trigger={
            <button className="btn flex items-center">
                <AiOutlinePlus className="text-accent-600"/>
                Create
            </button>
        }>
            {(close: () => void) => (
                <div className="flex flex-col bg-primary-50 p-2">
                    <div className="flex justify-between">
                        <p>Create a folder</p>
                        <button className="btn" onClick={close}><AiOutlineClose/></button>
                    </div>
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="dirname"/>
                    <button
                        disabled={isCreateDisabled()}
                        onClick={() => { handleCreate(); close() }}
                        className="btn self-end disabled:text-black/25 hover:disabled:bg-primary-50"
                    >Create</button>
                </div>
            )}
        </Popup>
    )
}

export default Create
