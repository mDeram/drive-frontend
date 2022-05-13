import { AnyDirectoryItem } from "../types";
import pathLib from "path";
import { toTrashName } from "./trash";

const getDriveItemKey = (path: string, item: AnyDirectoryItem) => {
    if (item.__typename === "DirectoryItem") return pathLib.join(path, item.name);
    if (item.__typename === "TrashDirectoryItem") return pathLib.join(path, toTrashName(item));
    if (item.__typename === "SearchDirectoryItem") return pathLib.join(item.path, item.name);
}

export default getDriveItemKey;
