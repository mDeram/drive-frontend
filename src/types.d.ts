import { DirectoryItem, SearchDirectoryItem, TrashDirectoryItem } from "./generated/graphql";

type AnyDirectoryItem = (TrashDirectoryItem | SearchDirectoryItem | DirectoryItem);
