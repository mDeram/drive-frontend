import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
    setPath: (newPath: string) => void;
    search: (pattern: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    setPath,
    search
}) => {
    const [value, setValue] = useState("");

    function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter")
            search(value);
    }

    return (
        <div className="flex items-center bg-primary-50 rounded-lg">
            <AiOutlineSearch className="text-accent-600"/>
            <input onKeyPress={handleSearch} id="search" className="text-black outline-none bg-transparent" type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Search"/>
            {value && <button className="btn bg-transparent hover:bg-transparent text-secondary-600 hover:text-accent-600" onClick={() => setValue("")}>
                <AiOutlineClose/>
            </button>}
            {value && <button className="btn bg-accent-700 hover:bg-accent-800 rounded-r-lg" onClick={() => search(value)}>
                <AiOutlineArrowRight/>
            </button>}
        </div>
    );
}

export default SearchBar;
