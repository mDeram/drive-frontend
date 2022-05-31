import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useMkdirMutation } from "../generated/graphql";
import pathLib from "path";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Popup from "./Popup";
import { usePathContext } from "../contexts/Path";
import { AnyDirectoryItem } from "../types";
import FormError from "./FormError";

interface CreateProps {
    allItems: AnyDirectoryItem[];
}

const Create: React.FC<CreateProps> = ({
    allItems: items
}) => {
    const { path } = usePathContext();
    const [,createDirectory] = useMkdirMutation();
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const closeRef = useRef<Function>();
    const inputRef = useCallback((input: HTMLInputElement) => {
        if (!input) return;
        input.focus();
    }, []);

    useEffect(() => {
        if (error) setError(null);
    }, [value]);

    function handleCreate(): boolean {
        if (items.find(({ name }) => name === value)) {
            setError("An item with the same name already exists");
            return false;
        }

        createDirectory({ dirname: pathLib.join(path, value) });
        setValue("");
        return true;
    }

    function isCreateDisabled(): boolean {
        return !value.length;
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleCreate() && closeRef.current && closeRef.current();
    }

    return (
        <Popup closeRef={closeRef} onOpen={() => setValue("")} trigger={
            <button className="btn flex items-center">
                <AiOutlinePlus className="text-accent-600"/>
                Create
            </button>
        }>
            {(close: () => void) => (
                <div className="flex flex-col bg-primary-50 p-2 max-w-screen-xs w-screen">
                    <div className="flex justify-between">
                        <p>Create a folder</p>
                        <button className="btn" onClick={close}><AiOutlineClose/></button>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input ref={inputRef} type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="dirname"/>
                        <FormError error={error}/>
                        <button className="btn self-end disabled:text-black/25 hover:disabled:bg-primary-50"
                            type="submit"
                            disabled={isCreateDisabled()}
                        >Create</button>
                    </form>
                </div>
            )}
        </Popup>
    )
}

export default Create
