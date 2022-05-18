import { ClientOptions, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import schema, { LoginMutation, RegisterMutation, UserDocument, UserQuery } from "../generated/graphql";
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

                                const path = pathLib.dirname((args.paths as string[])[index]);
                                cache.invalidate("Query", "ls", { path });
                            });
                            cache.invalidate("Query", "lsTrash");
                            cache.invalidate("Query", "diskUsage");
                        },
                        trash: (result, args, cache, _info) => {
                            (result.trash as boolean[]).forEach((value, index) => {
                                if (!value) return;

                                const path = pathLib.dirname((args.paths as string[])[index]);
                                cache.invalidate("Query", "ls", { path });
                            });
                            cache.invalidate("Query", "lsTrash");
                        },
                        restore: (result, _args, cache, _info) => {
                            if (!(result.restore as boolean[]).find(item => item === true)) return;

                            cache.invalidate("Query", "ls", { path: "/files" });
                            cache.invalidate("Query", "lsTrash");
                        },
                        mkdir: (result, args, cache, _info) => {
                            if (!result.mkdir || !args) return;

                            const path = pathLib.dirname(args.dirname as string);
                            cache.invalidate("Query", "ls", { path });
                            cache.invalidate("Query", "diskUsage");
                        },
                        logout: (result, _args, cache, _info) => {
                            if (!result.logout) return;

                            cache.updateQuery<UserQuery>({ query: UserDocument }, _data => {
                                return { user: null };
                            });
                        },
                        login: (result, _args, cache, _info) => {
                            cache.updateQuery<UserQuery>({ query: UserDocument }, data => {
                                const typedResult = result as LoginMutation;
                                if (typedResult.login)
                                    return { user: typedResult.login }
                                return data;
                            });
                        },
                        register: (result, _args, cache, _info) => {
                            cache.updateQuery<UserQuery>({ query: UserDocument }, data => {
                                const typedResult = result as RegisterMutation;
                                if (typedResult.register)
                                    return { user: typedResult.register }
                                return data;
                            });
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
