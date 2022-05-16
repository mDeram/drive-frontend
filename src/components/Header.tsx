import React from "react";
import { AiFillCloud } from "react-icons/ai";
import SearchBar from "./SearchBar";
import User from "./User";

interface HeaderProps {
    setPath: (newPath: string) => void;
    search: (pattern: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    setPath,
    search
}) => {
    return (
        <header className="p-2 px-5 w-full flex items-center justify-between text-2xl bg-accent-600 text-primary-50">
            <div className="flex items-center">
                <AiFillCloud className="text-4xl"/>
                <h1 className="ml-3">Cloud</h1>
            </div>
            <SearchBar setPath={setPath} search={search}/>
            <User/>
        </header>
    );
}

export default Header;
