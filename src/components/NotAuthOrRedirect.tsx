import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserQuery } from "../generated/graphql";

interface NotAuthOrRedirectProps {
    path: string;
}

const NotAuthOrRedirect: React.FC<NotAuthOrRedirectProps> = ({
    children,
    path
}) => {
    const [{ data, fetching }] = useUserQuery();
    const router = useRouter();

    useEffect(() => {
        if (!fetching && data?.user) router.replace(path);
    }, [fetching, data, router, path]);

    return (<>{children}</>);
}

export default NotAuthOrRedirect;
