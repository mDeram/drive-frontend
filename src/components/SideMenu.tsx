import React from "react";
import { useUserQuery } from "../generated/graphql";
import { AiFillFolder } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import UsageBar from "./UsageBar";
import NavButton from "./NavButton";
import BuyStorage from "./BuyStorage";

const SideMenu: React.FC = () => {
    const [{ data: dataUser }] = useUserQuery();

    return (
        <div className="flex flex-col justify-between bg-secondary-200 w-72 border-r border-secondary-300">
            <div className="flex flex-col">
                <div className="p-3 font-medium border-b border-secondary-400">{dataUser?.user?.username}</div>
                <nav>
                    <NavButton name="My Files" hrefPath="/files" icon={<AiFillFolder/>}/>
                    <NavButton name="Trash" hrefPath="/trash" icon={<AiFillDelete/>}/>
                </nav>
            </div>
            <div className="flex flex-col m-3">
                <BuyStorage/>
                <UsageBar/>
            </div>
        </div>
    );
}

export default SideMenu;
