import classNames from "classnames";
import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import useOuterClick from "../hooks/useOuterClick";

interface SearchBarProps {
    search: (pattern: string) => void;
    searchOnly: boolean;
    setSearchOnly: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar: React.FC<SearchBarProps> = ({
    search,
    searchOnly,
    setSearchOnly
}) => {
    const [value, setValue] = useState("");
    const outerClickRef = useOuterClick(handleCloseSearchOnly, searchOnly);

    function handleCloseSearchOnly() {
        setSearchOnly(prev => !prev);
    }

    function handleSearch() {
        search(value);
        handleCloseSearchOnly();
    }

    return (
        <div ref={outerClickRef as any}
            className={classNames("flex bg-primary-50 rounded-lg max-w-xs md:max-w-none m-1", {
                "md:rounded-r-xl": value,
                "rounded-r-xl": value && searchOnly
            }
        )}>
            <button onClick={handleCloseSearchOnly}>
                <AiOutlineSearch className="text-accent-600 m-2 shrink-0"/>
            </button>
            <input
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                id="search"
                className={classNames(
                    "text-xl text-black outline-none bg-transparent w-full sm:block", {
                        "hidden": !searchOnly
                    }
                )}
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search"
            />
            <button onClick={() => setValue("")} className={classNames(
                "btn bg-transparent hover:bg-transparent text-secondary-600 hover:text-accent-600 sm:block", {
                "invisible": !value,
                "hidden": !searchOnly
            })}>
                <AiOutlineClose/>
            </button>
            <button onClick={handleSearch} className={classNames(
                "btn bg-accent-700 hover:bg-accent-800 rounded-r-lg sm:block", {
                "invisible": !value,
                "hidden": !searchOnly
            })}>
                <AiOutlineArrowRight/>
            </button>
        </div>
    );
}

export default SearchBar;
