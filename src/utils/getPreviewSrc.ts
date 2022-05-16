import { AnyDirectoryItem } from "../types";
import pathLib from "path";
import getDriveItemPath from "./getDriveItemPath";

const getPreviewSrc = (path: string, item: AnyDirectoryItem) => {
    const result = pathLib.join("/fs/cropped", getDriveItemPath(path, item) || "");
    return process.env.NEXT_PUBLIC_API + result;
}

export default getPreviewSrc;
