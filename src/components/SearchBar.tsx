import classNames from "classnames";
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
        <div className={classNames("flex bg-primary-50 rounded-lg m-1", { "rounded-r-xl": value })}>
            <AiOutlineSearch className="text-accent-600 m-2"/>
            <input
                onKeyPress={handleSearch}
                id="search"
                className="text-xl text-black outline-none bg-transparent"
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search"
            />
            <button onClick={() => setValue("")} className={classNames(
                "btn bg-transparent hover:bg-transparent text-secondary-600 hover:text-accent-600", {
                "invisible": !value
            })}>
                <AiOutlineClose/>
            </button>
            <button onClick={() => search(value)} className={classNames(
                "btn bg-accent-700 hover:bg-accent-800 rounded-r-lg", {
                "invisible": !value
            })}>
                <AiOutlineArrowRight/>
            </button>
        </div>
    );
}

export default SearchBar;
