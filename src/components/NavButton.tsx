import React, { ReactElement } from "react";
import classNames from "classnames";
import { usePathContext } from "../contexts/Path";

interface NavButtonProps {
    hrefPath: string;
    name: string;
    icon: ReactElement;
}

const NavButton: React.FC<NavButtonProps> = ({
    hrefPath,
    name,
    icon
}) => {
    const { path, setPath } = usePathContext();
    return (
        <button
            className={classNames(
                "flex items-center w-full hover:bg-secondary-300 hover:text-accent-600 p-2", {
                "bg-secondary-400": path.startsWith(hrefPath),
                "hover:bg-secondary-400": path.startsWith(hrefPath)
            })}
            onClick={() => setPath(hrefPath)}
        >
            {icon}
            {name}
        </button>
    );
}

export default NavButton;
