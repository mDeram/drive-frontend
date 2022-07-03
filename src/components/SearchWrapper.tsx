import { useSetAtom } from "jotai";
import { ReactElement, useEffect, useState } from "react";
import { pathAtom } from "../atoms/path";
import { SearchDirectoryItem, useSearchQuery } from "../generated/graphql";

interface SearchWrapperProps {
    children: (
        results: SearchDirectoryItem[] | undefined,
        fetching: boolean,
        search: (pattern: string) => void
    ) => ReactElement;
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({
    children
}) => {
    const setPath = useSetAtom(pathAtom);
    const [pattern, setPattern] = useState("");
    const [hasToSearch, setHasToSearch] = useState(false);
    const [{ data, fetching }, runSearch] = useSearchQuery({
        variables: { pattern },
        pause: true,
        // It avoid having to implement everything on the cache
        // but it result in a higher load on the server
        requestPolicy: "network-only"
    });

    useEffect(() => {
        if (!hasToSearch) return;

        runSearch();
        setPath("/search");
        setHasToSearch(false);
    }, [hasToSearch])

    function search(pattern: string) {
        setPattern(pattern);
        setHasToSearch(true);
    }

    return (
        <>
        {children(data?.search, fetching, search)}
        </>
    );
}

export default SearchWrapper;
