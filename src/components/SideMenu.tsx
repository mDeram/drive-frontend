import React from "react";
import { useUserQuery } from "../generated/graphql";
import { AiFillFolder } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import UsageBar from "./UsageBar";
import NavButton from "./NavButton";

interface SideMenuProps {
    path: string;
    setPath: (newPath: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
    path,
    setPath
}) => {
    const [{ data: dataUser }] = useUserQuery();

    return (
        <div className="flex flex-col justify-between bg-secondary-200 w-72 border-r border-secondary-300">
            <div className="flex flex-col">
                <div className="p-3 font-medium border-b border-secondary-400">{dataUser?.user.name}</div>
                <nav>
                    <NavButton path={path} setPath={setPath} name="My Files" hrefPath="/files" icon={<AiFillFolder/>}/>
                    <NavButton path={path} setPath={setPath} name="Trash" hrefPath="/trash" icon={<AiFillDelete/>}/>
                </nav>
            </div>
            <UsageBar/>
        </div>
    );
}

export default SideMenu;
