import React from "react";
import { useUserQuery } from "../generated/graphql";
import { AiFillFolder } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import UsageBar from "./UsageBar";
import NavButton from "./NavButton";
import BuyStorage from "./BuyStorage";
import classNames from "classnames";
import { useAtom } from "jotai";
import { showSideMenuAtom } from "../atoms/sideMenu";
import useOuterClick from "../hooks/useOuterClick";

const SideMenu: React.FC = () => {
    const [{ data: dataUser }] = useUserQuery();
    const [showSideMenu, setShowSideMenu] = useAtom(showSideMenuAtom);
    const outerClickRef = useOuterClick(() => setShowSideMenu(false), showSideMenu);

    return (
        <div ref={outerClickRef as any} className={classNames(`flex flex-col
            z-10 justify-between bg-secondary-200 w-56 lg:w-64 xl:w-72
            shrink-0 border-r border-secondary-300 transition-all
            absolute sm:static sm:visible top-0 bottom-0`, {
                "invisible": !showSideMenu
        })}>
            <div className="flex flex-col">
                <div className="py-2 px-4 font-medium border-b border-secondary-400"><p>{dataUser?.user?.username}</p></div>
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
