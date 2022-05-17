import { SearchDirectoryItem, useLsQuery, useLsTrashQuery } from "../generated/graphql";
import { AnyDirectoryItem } from "../types";

type useListItemsSignature = (
    path: string,
    searchResults: SearchDirectoryItem[] | undefined,
    searchFetching: boolean
) => ({
    lsData?: AnyDirectoryItem[],
    fetching: boolean
});

const useListItems: useListItemsSignature = (path, searchResults, searchFetching) => {
    const [{ data: dataFiles, fetching: fetchingFiles }] = useLsQuery({ variables: { path }, pause: !path.startsWith("/files") });
    const [{ data: dataTrash, fetching: fetchingTrash }] = useLsTrashQuery({ pause: !path.startsWith("/trash") });

    if (path.startsWith("/search")) return searchFetching ? { fetching: true } : { fetching: false, lsData: searchResults };
    if (path.startsWith("/files")) return fetchingFiles ? { fetching: true } : { fetching: false, lsData: dataFiles?.ls };
    if (path.startsWith("/trash")) return fetchingTrash ? { fetching: true } : { fetching: false, lsData: dataTrash?.lsTrash };

    return { fetching: false };
}

export default useListItems;
