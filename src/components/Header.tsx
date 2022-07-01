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
    const [searchOnly, setSearchOnly] = useState(true);

    return (
        <header className={classNames("p-2 px-5 w-full flex items-center md:justify-between text-2xl bg-accent-600 text-primary-50",
            searchOnly ? "justify-center" : "justify-between"
        )}>
            {!searchOnly &&
                <div className="flex items-center">
                    <AiFillCloud className="text-4xl"/>
                    <h1 className="font-bold ml-3">Cloud</h1>
                </div>
            }
            <SearchBar search={search} searchOnly={searchOnly} setSearchOnly={setSearchOnly}/>
            {!searchOnly && <User/>}
        </header>
    );
}

export default Header;
