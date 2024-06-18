import { atom } from "jotai";
import pathLib from "path";

export const pathAtom = atom("/files");
export const appendPathAtom = atom(null, (get, set, value: string) => (
    set(pathAtom, pathLib.join(get(pathAtom), value))
));
