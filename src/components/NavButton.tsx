import React, { ReactElement } from "react";
import classNames from "classnames";

interface NavButtonProps {
    path: string;
    hrefPath: string;
    name: string;
    icon: ReactElement;
    setPath: (newPath: string) => void;
}

const NavButton: React.FC<NavButtonProps> = ({
    path,
    hrefPath,
    name,
    icon,
    setPath
}) => {
    return (
        <button
            className={classNames(
                "flex items-center w-full hover:bg-secondary-300 hover:text-accent-600 p-2",
                { "bg-secondary-400": path === hrefPath }
            )}
            onClick={() => setPath(hrefPath)}
        >
            {icon}
            {name}
        </button>
    );
}

export default NavButton;
