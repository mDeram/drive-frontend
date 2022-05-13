import { SearchDirectoryItem, useLsQuery, useLsTrashQuery } from "../generated/graphql";
import { AnyDirectoryItem } from "../types";

type useListItemsSignature = (
    path: string,
    searchResults: SearchDirectoryItem[] | undefined,
    searchFetching: boolean
) => (AnyDirectoryItem[] | undefined);

const useListItems: useListItemsSignature = (path, searchResults, searchFetching) => {
    const [{ data: dataFiles, fetching: fetchingFiles }] = useLsQuery({ variables: { path }, pause: !path.startsWith("/files") });
    const [{ data: dataTrash, fetching: fetchingTrash }] = useLsTrashQuery({ pause: !path.startsWith("/trash") });

    if (path.startsWith("/search")) return searchFetching ? undefined : searchResults;
    if (path.startsWith("/files")) return fetchingFiles ? undefined : dataFiles?.ls;
    if (path.startsWith("/trash")) return fetchingTrash ? undefined : dataTrash?.lsTrash;

    return undefined;
}

export default useListItems;
