import { useEffect, useState } from "react";
import { DirectoryItem, useSearchQuery } from "../generated/graphql";

const useSearch: (setPath: (newPath: string) => void) =>[DirectoryItem[] | undefined, any, (pattern: string) => void] = (setPath) => {
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

    return [data?.search, fetching, search];
}

export default useSearch;
