import React from "react";
import { useDuQuery, useUserQuery } from "../generated/graphql";

interface UsageBarProps {

}

const UsageBar: React.FC<UsageBarProps> = () => {
    const [{ data: dataUser }] = useUserQuery();
    const [{ data: dataDu }] = useDuQuery();

    function renderUsageBar() {
        const diskUsage = dataDu?.diskUsage;
        const subscriptionSize = dataUser?.user?.subscriptionSize;
        if (!diskUsage || !subscriptionSize) return;

        const percent = diskUsage / subscriptionSize * 100;

        return (
            <div className="w-full bg-secondary-400 h-1 rounded-sm">
                <div className="bg-accent-600 h-full" style={{width: `${percent}%`}}></div>
            </div>
        )
    }

    function renderUsage() {
        const diskUsage = dataDu?.diskUsage;
        const subscriptionSize = dataUser?.user?.subscriptionSize;
        if (!diskUsage || !subscriptionSize) return;

        const formatedValues = [diskUsage, subscriptionSize]
            .map(valueInKo => (valueInKo/1024).toFixed(1))
            .map(valueInMo => (
                valueInMo.endsWith(".0") ? valueInMo.slice(0, -2) : valueInMo
            ));

        return <p>{formatedValues[0]} Mo used on {formatedValues[1]} Mo</p>
    }

    return (
        <div className="flex flex-col m-3">
            {renderUsageBar()}
            {renderUsage()}
        </div>
    );
}

export default UsageBar;
