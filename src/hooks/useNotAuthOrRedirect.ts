import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserQuery } from "../generated/graphql";

const useNotAuthOrRedirect = (path: string) => {
    const [{ data, fetching }] = useUserQuery();
    const router = useRouter();

    useEffect(() => {
        if (!fetching && data?.user) router.replace(path);
    }, [fetching, data, router, path]);
}

export default useNotAuthOrRedirect;
