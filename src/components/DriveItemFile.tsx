import classNames from "classnames";
import React from "react";
import { AiFillFile } from "react-icons/ai";

interface DriveItemFileProps {
    name: string;
    path: string;
}

const DriveItemFile: React.FC<DriveItemFileProps> = ({
    name,
    path
}) => {
    function isOpenable() {
        //TODO implement
        return false;
    }

    function hasPreview() {
        return [".png", ".jpg", ".gif"].includes(name.slice(-4));
    }

    function handleClick() {
        //TODO show file if it is an image
    }

    return (
        <div className={classNames("flex items-center h-full w-full", {
                "cursor-pointer": isOpenable(),
            })}
        >
            {hasPreview()
                ? <img className="max-h-full object-contain w-9" src={`${process.env.NEXT_PUBLIC_API}/fs/cropped${path}${name}`}/>
                : <AiFillFile className="text-xl"/>
            }
            {isOpenable()
                ? <p className="hover:cursor-pointer hover:underline" onClick={handleClick}>{name}</p>
                : <p>{name}</p>
            }
        </div>
    )
}

export default DriveItemFile;
