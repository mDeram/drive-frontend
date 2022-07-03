import { useAtomValue } from "jotai";
import { ImFileEmpty } from "react-icons/im";
import { pathAtom } from "../atoms/path";

const EmptyData: React.FC = () => {
    const path = useAtomValue(pathAtom);

    function renderText() {
        if (path.startsWith("/files")) return "This Folder is empty";
        if (path.startsWith("/trash")) return "Trash is empty";
        if (path.startsWith("/search")) return "No results";
    }

    return (
        <div className="h-full flex flex-col items-center justify-center text-xl font-semibold">
            <ImFileEmpty className="text-8xl"/>
            <p className="mt-6">{renderText()}</p>
        </div>
    )
}

export default EmptyData;
