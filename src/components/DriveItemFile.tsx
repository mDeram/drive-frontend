import classNames from "classnames";
import React from "react";
import { AiFillFile } from "react-icons/ai";
import { usePathContext } from "../contexts/Path";
import { AnyDirectoryItem } from "../types";
import { getApiCroppedSrc } from "../utils/getApiSrc";

interface DriveItemFileProps {
    item: AnyDirectoryItem;
}

const DriveItemFile: React.FC<DriveItemFileProps> = ({
    item
}) => {
    const { path } = usePathContext();

    function hasPreview() {
        return [".png", ".jpg", ".gif"].includes(item.name.slice(-4));
    }

    function isOpenable() {
        //TODO implement
        return false;
    }

    function handleOpen() {
        //TODO show file if it is an image
    }

    return (
        <div className={classNames("flex gap-1 items-center h-full w-full", {
                "cursor-pointer": isOpenable(),
            })}
        >
            {hasPreview()
                ? <img className="max-h-full object-contain w-9" src={getApiCroppedSrc(path, item)}/>
                : <AiFillFile className="text-xl"/>
            }
            {isOpenable()
                ? <p className="hover:cursor-pointer hover:underline" onClick={handleOpen}>{item.name}</p>
                : <p>{item.name}</p>
            }
        </div>
    )
}

export default DriveItemFile;
