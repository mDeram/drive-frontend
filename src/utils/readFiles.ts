import { promises as fs } from "fs";
import path from "path";
const directory = '/public/files';

const getFiles = () => {
    return fs.readdir(path.join(process.cwd(), directory))
}

export default getFiles;
