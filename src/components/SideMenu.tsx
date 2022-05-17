import React from "react";
import { useUserQuery } from "../generated/graphql";
import { AiFillFolder } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import UsageBar from "./UsageBar";
import NavButton from "./NavButton";

const SideMenu: React.FC = () => {
    const [{ data: dataUser }] = useUserQuery();

    return (
        <div className="flex flex-col justify-between bg-secondary-200 w-72 border-r border-secondary-300">
            <div className="flex flex-col">
                <div className="p-3 font-medium border-b border-secondary-400">{dataUser?.user.name}</div>
                <nav>
                    <NavButton name="My Files" hrefPath="/files" icon={<AiFillFolder/>}/>
                    <NavButton name="Trash" hrefPath="/trash" icon={<AiFillDelete/>}/>
                </nav>
            </div>
            <UsageBar/>
        </div>
    );
}

export default SideMenu;
