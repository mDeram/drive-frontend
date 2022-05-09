import { ClientOptions, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import schema from "../generated/graphql";
//import { NextUrqlClientConfig } from "next-urql";
import { devtoolsExchange } from "@urql/devtools";
import { ___prod___ } from "../constants";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import pathLib from "path";

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
                        upload: (result, args, cache, _info) => {
                            if (!result.upload || !args) return;

                            cache.invalidate("Query", "ls", { path: args.path });
                            cache.invalidate("Query", "diskUsage");
                        },
                        rm: (result, args, cache, _info) => {
                            (result.rm as boolean[]).forEach((value, index) => {
                                if (!value) return;

                                const path = pathLib.join((args.paths as string[])[index], "../");
                                cache.invalidate("Query", "ls", { path });
                            });
                            cache.invalidate("Query", "diskUsage");
                        },
                        mkdir: (result, args, cache, _info) => {
                            if (!result.mkdir || !args) return;

                            const path = pathLib.join(args.dirname as string, "../");
                            cache.invalidate("Query", "ls", { path });
                            cache.invalidate("Query", "diskUsage");
                        },
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
