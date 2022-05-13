import { DirectoryItem, useLsQuery } from "../generated/graphql";

type useListItemsSignature = (
    path: string,
    searchResults: DirectoryItem[] | undefined,
    searchFetching: boolean
) => (DirectoryItem[] | undefined);

const useListItems: useListItemsSignature = (path, searchResults, searchFetching) => {
    const [{ data, fetching, error }] = useLsQuery({ variables: { path }, pause: path.startsWith("/search") });

    if (path.startsWith("/search")) return searchResults;

    return data?.ls;
}

export default useListItems;
