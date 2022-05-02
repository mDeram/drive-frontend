import { ClientOptions, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import schema from "../generated/graphql";
//import { NextUrqlClientConfig } from "next-urql";
import { devtoolsExchange } from "@urql/devtools";
import { ___prod___ } from "../constants";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

const createUrqlClient = () => {
    const config: ClientOptions = {
        url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
        fetchOptions: {
            credentials: "include"
        },
        exchanges: [
            dedupExchange,
            cacheExchange({
                schema,
                updates: {
                    Mutation: {
                        upload: (result, _args, cache, _info) => {
                            if (!result.upload) return;
                            cache.invalidate("Query", "ls");
                        },
                        rm: (result, _args, cache, _info) => {
                            cache.invalidate("Query", "ls");
                        }
                    }
                }
            }),
            //ssrExchange,
            /*errorExchange({
                onError(error) {
                    if (error.message.includes("Not authenticated"))
                        Router.push("/editor/login");
                }
            }),*/
            multipartFetchExchange
        ]
    }

    if (!___prod___)
        config.exchanges = [devtoolsExchange, ...config.exchanges!];

    return config;
};

export default createUrqlClient;
