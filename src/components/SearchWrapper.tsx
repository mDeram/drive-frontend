import { ReactElement, useEffect, useState } from "react";
import { usePathContext } from "../contexts/Path";
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
    const { setPath } = usePathContext();
    const [pattern, setPattern] = useState("");
    const [{ data, fetching }, runSearch] = useSearchQuery({
        variables: { pattern },
        pause: true
    });

    useEffect(() => {
        if (pattern === "") return;

        runSearch();
        setPath("/search");
    }, [pattern])

    function search(pattern: string) {
        setPattern(pattern);
    }

    return (
        <>
        {children(data?.search, fetching, search)}
        </>
    );
}

export default SearchWrapper;
