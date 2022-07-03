import { atom } from "jotai";
import pathLib from "path";

export const pathAtom = atom("/files");
export const appendPathAtom = atom<null, string>(null, (get, set, value) => (
    set(pathAtom, pathLib.join(get(pathAtom), value))
));
