import React from "react";
import DriveItem from "./DriveItem";

interface DriveItemsProps {

}

const DriveItems: React.FC<DriveItemsProps> = () => {
    return (
        <ul>
            {items.map(item => <DriveItem/>)}
        </ul>
    )
}

const items = [
    "yo",
    "lo"
]

export default DriveItems
