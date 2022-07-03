import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMkdirMutation } from "../generated/graphql";
import pathLib from "path";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Popup from "./Popup";
import { AnyDirectoryItem } from "../types";
import FormError from "./FormError";
import { useNotificationContext } from "../contexts/Notification";
import SimpleNotification from "./SimpleNotification";
import { useAtomValue } from "jotai";
import { pathAtom } from "../atoms/path";

interface CreateProps {
    allItems: AnyDirectoryItem[];
}

const Create: React.FC<CreateProps> = ({
    allItems: items
}) => {
    const path = useAtomValue(pathAtom);
    const [,createDirectory] = useMkdirMutation();
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { pushNotificationDefault } = useNotificationContext()!;
    const closeRef = useRef<Function>();
    const inputRef = useCallback((input: HTMLInputElement) => {
        if (!input) return;
        input.focus();
    }, []);

    useEffect(() => {
        if (error) setError(null);
    }, [value]);

    async function handleCreate() {
        if (items.find(({ name }) => name === value)) {
            setError("An item with the same name already exists");
            return;
        }

        const result = await createDirectory({ dirname: pathLib.join(path, value) });
        if (result.data && !result.data.mkdir) {
            pushNotificationDefault(<SimpleNotification type="error" text="Could not create the folder"/>);
            return;
        }

        pushNotificationDefault(<SimpleNotification type="success" text="Folder created!"/>);
        setValue("");
        closeRef.current && closeRef.current();
    }

    function isCreateDisabled(): boolean {
        return !value.length;
    }

    function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") handleCreate();
    }

    return (
        <Popup closeRef={closeRef} onOpen={() => setValue("")} trigger={
            <button className="btn flex items-center">
                <AiOutlinePlus className="text-accent-600"/>
                Create
            </button>
        }>
            {(close: () => void) => (
                <div className="flex flex-col bg-primary-50 p-5 h-64 text-lg max-w-screen-xs w-screen justify-between">
                    <div className="flex justify-between">
                        <p>Create a folder</p>
                        <button className="btn p-1 text-lg" onClick={close}><AiOutlineClose/></button>
                    </div>
                    <div>
                        <input
                            className="w-full p-2 border border-primary-800"
                            ref={inputRef}
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder="Enter directory name"
                            onKeyPress={handleEnter}
                        />
                        <div className="absolute">
                            <FormError error={error}/>
                        </div>
                    </div>
                    <button
                        className={`
                            btn text-primary-50 bg-accent-600 hover:bg-accent-700
                            font-bold px-4 self-end
                            disabled:text-primary-50/25 disabled:bg-accent-600/25
                            disabled:cursor-default
                        `}
                        disabled={isCreateDisabled()}
                        onClick={handleCreate}
                    >Create</button>
                </div>
            )}
        </Popup>
    )
}

export default Create
