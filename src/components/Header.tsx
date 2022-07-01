import classNames from "classnames";
import React, { useState } from "react";
import { AiFillCloud } from "react-icons/ai";
import SearchBar from "./SearchBar";
import User from "./User";

interface HeaderProps {
    search: (pattern: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    search
}) => {
    const [searchOnly, setSearchOnly] = useState(false);

    return (
        <header className={classNames("p-2 px-5 w-full flex items-center sm:justify-between text-2xl bg-accent-600 text-primary-50",
            searchOnly ? "justify-center" : "justify-between"
        )}>
            <div className={classNames("flex sm:flex items-center", {
                "hidden": searchOnly
            })}>
                <AiFillCloud className="text-4xl"/>
                <h1 className="font-bold ml-3">Cloud</h1>
            </div>
            <SearchBar search={search} searchOnly={searchOnly} setSearchOnly={setSearchOnly}/>
            <div className={classNames("sm:block", { "hidden": searchOnly })}><User/></div>
        </header>
    );
}

export default Header;
