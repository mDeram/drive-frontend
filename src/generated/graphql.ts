import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type DirectoryItem = {
  __typename?: 'DirectoryItem';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  mkdir: Scalars['Boolean'];
  rm: Array<Scalars['Boolean']>;
  upload: Scalars['Boolean'];
};


export type MutationMkdirArgs = {
  dirname: Scalars['String'];
};


export type MutationRmArgs = {
  paths: Array<Scalars['String']>;
};


export type MutationUploadArgs = {
  file: Scalars['Upload'];
  path?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  ls: Array<DirectoryItem>;
};


export type QueryLsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

export type MkdirMutationVariables = Exact<{
  dirname: Scalars['String'];
}>;


export type MkdirMutation = { __typename?: 'Mutation', mkdir: boolean };

export type RmMutationVariables = Exact<{
  paths: Array<Scalars['String']> | Scalars['String'];
}>;


export type RmMutation = { __typename?: 'Mutation', rm: Array<boolean> };

export type UploadMutationVariables = Exact<{
  path: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadMutation = { __typename?: 'Mutation', upload: boolean };

export type LsQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type LsQuery = { __typename?: 'Query', ls: Array<{ __typename?: 'DirectoryItem', name: string, type: string }> };


export const MkdirDocument = gql`
    mutation Mkdir($dirname: String!) {
  mkdir(dirname: $dirname)
}
    `;

export function useMkdirMutation() {
  return Urql.useMutation<MkdirMutation, MkdirMutationVariables>(MkdirDocument);
};
export const RmDocument = gql`
    mutation Rm($paths: [String!]!) {
  rm(paths: $paths)
}
    `;

export function useRmMutation() {
  return Urql.useMutation<RmMutation, RmMutationVariables>(RmDocument);
};
export const UploadDocument = gql`
    mutation Upload($path: String!, $file: Upload!) {
  upload(path: $path, file: $file)
}
    `;

export function useUploadMutation() {
  return Urql.useMutation<UploadMutation, UploadMutationVariables>(UploadDocument);
};
export const LsDocument = gql`
    query Ls($path: String!) {
  ls(path: $path) {
    name
    type
  }
}
    `;

export function useLsQuery(options: Omit<Urql.UseQueryArgs<LsQueryVariables>, 'query'>) {
  return Urql.useQuery<LsQuery>({ query: LsDocument, ...options });
};
import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "DirectoryItem",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "mkdir",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "dirname",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "rm",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            },
            "args": [
              {
                "name": "paths",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Any"
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "upload",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "file",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "path",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "ls",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DirectoryItem",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "path",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;