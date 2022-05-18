import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserQuery } from "../generated/graphql";
import FetchingData from "./FetchingData";

interface AuthOrRedirectProps {
    path: string;
}

const AuthOrRedirect: React.FC<AuthOrRedirectProps> = ({
    children,
    path
}) => {
    const [{ data, fetching }] = useUserQuery();
    const router = useRouter();

    useEffect(() => {
        if (!fetching && !data?.user) router.replace(path);
    }, [fetching, data, router, path]);

    return (
        <>
        {data?.user
            ? children
            : <FetchingData/>
        }
        </>
    );
}

export default AuthOrRedirect;
