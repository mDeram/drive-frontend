import React from "react";
import { useDuQuery, useUserQuery } from "../generated/graphql";
import { AiFillFolder } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

interface SideMenuProps {

}

const SideMenu: React.FC<SideMenuProps> = () => {
    const [{ data: dataUser }] = useUserQuery();
    const [{ data: dataDu }] = useDuQuery();

    function renderUsageBar() {
        const diskUsage = dataDu?.diskUsage;
        const subscriptionSize = dataUser?.user.subscriptionSize;
        if (!diskUsage || !subscriptionSize) return;

        const percent = diskUsage / subscriptionSize * 100;

        return (
            <div className="w-full bg-secondary-400 h-1 rounded-sm">
                <div className="bg-accent-600 h-full" style={{width: percent}}></div>
            </div>
        )
    }

    function renderUsage() {
        const diskUsage = dataDu?.diskUsage;
        const subscriptionSize = dataUser?.user.subscriptionSize;
        if (!diskUsage || !subscriptionSize) return;

        const formatedValues = [diskUsage, subscriptionSize]
            .map(valueInKo => (valueInKo/1024).toFixed(1))
            .map(valueInMo => (
                valueInMo.endsWith(".0") ? valueInMo.slice(0, -2) : valueInMo
            ));

        return <p>{formatedValues[0]} Mo used on {formatedValues[1]} Mo</p>
    }

    return (
        <div className="flex flex-col justify-between bg-secondary-200 w-72 border-r border-secondary-300">
            <div className="flex flex-col">
                <div className="p-3 font-medium border-b border-secondary-400">{dataUser?.user.name}</div>
                <nav>
                    <button className="flex items-center w-full hover:bg-secondary-300 hover:text-accent-600 p-2">
                        <AiFillFolder/>
                        My Files
                    </button>
                    <button className="flex items-center w-full hover:bg-secondary-300 hover:text-accent-600 p-2">
                        <AiFillDelete/>
                        Trash
                    </button>
                </nav>
            </div>
            <div className="flex flex-col m-3">
                {renderUsageBar()}
                {renderUsage()}
            </div>
        </div>
    );
}

export default SideMenu;
