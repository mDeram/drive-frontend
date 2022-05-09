import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {

}

const SearchBar: React.FC<SearchBarProps> = () => {
    const [value, setValue] = useState("");

    return (
        <div className="flex items-center bg-primary-50 rounded-lg">
            <AiOutlineSearch className="text-accent-600"/>
            <input className="text-black" type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Search"/>
        </div>
    );
}

export default SearchBar;
