import { AnyDirectoryItem } from "../types";
import pathLib from "path";
import getDriveItemPath from "./getDriveItemPath";

type Endpoint = "cropped" | "download"

const getApiSrc = (name: Endpoint, path: string) => {
    const result = pathLib.join(`/fs/${name}`, path);
    return process.env.NEXT_PUBLIC_API + result;
}

export const getApiDownloadSrc = (link: string) => {
    return getApiSrc("download", "/" + link);
}

export const getApiCroppedSrc = (path: string, item: AnyDirectoryItem) => {
    return getApiSrc("cropped", getDriveItemPath(path, item) || "");
}
