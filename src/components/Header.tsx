import classNames from "classnames";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { AiFillCloud, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { showSideMenuAtom } from "../atoms/sideMenu";
import SearchBar from "./SearchBar";
import User from "./User";

interface HeaderProps {
    search: (pattern: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    search
}) => {
    const [searchOnly, setSearchOnly] = useState(false);
    const [showSideMenu, setShowSideMenu] = useAtom(showSideMenuAtom);
    const MenuIcon = showSideMenu ? AiOutlineMenuFold : AiOutlineMenuUnfold;

    return (
        <header className={classNames("p-2 px-5 w-full flex items-center sm:justify-between text-2xl bg-accent-600 text-primary-50",
            searchOnly ? "justify-center" : "justify-between"
        )}>
            <div className="hidden sm:flex items-center gap-2">
                <AiFillCloud className="text-4xl" />
                <h1 className="font-bold ml-3 hidden sm:block">Drive</h1>
            </div>
            <MenuIcon className={classNames("text-4xl hover:cursor-pointer sm:hidden", {
                "hidden": searchOnly
            })} onClick={() => setShowSideMenu(!showSideMenu)} />
            <SearchBar search={search} searchOnly={searchOnly} setSearchOnly={setSearchOnly}/>
            <div className={classNames("sm:block", { "hidden": searchOnly })}><User/></div>
        </header>
    );
}

export default Header;
