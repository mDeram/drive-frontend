import React, { useState } from "react";
import { useMkdirMutation } from "../generated/graphql";
import pathLib from "path";

interface CreateProps {
    path: string
}

const Create: React.FC<CreateProps> = ({
    path
}) => {
    const [,createDirectory] = useMkdirMutation();
    const [value, setValue] = useState("");

    function handleClick() {
        createDirectory({ dirname: pathLib.join(path, value) });
        setValue("");
    }

    return (
        <>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="dirname"/>
        <button onClick={handleClick} className="bg-purple-600">Create</button>
        </>
    )
}

export default Create
