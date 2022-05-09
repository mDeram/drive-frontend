import React from "react";
import { AiFillCloud, AiOutlineUser } from "react-icons/ai";
import SearchBar from "./SearchBar";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header className="p-2 w-full flex items-center justify-between text-2xl bg-accent-600 text-primary-50">
            <div className="flex items-center">
                <AiFillCloud/>
                <h1>Cloud</h1>
            </div>
            <SearchBar/>
            <AiOutlineUser className="bg-primary-50 rounded-full text-accent-600" />
        </header>
    );
}

export default Header;
