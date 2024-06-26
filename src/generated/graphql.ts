import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BooleanFormResponse = BooleanResponse | FormErrors;

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  response: Scalars['Boolean']['output'];
};

export type DirectoryItem = {
  __typename?: 'DirectoryItem';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type FormError = {
  __typename?: 'FormError';
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type FormErrors = {
  __typename?: 'FormErrors';
  errors: Array<FormError>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmDeleteUser: BooleanFormResponse;
  confirmRegister: UserFormResponse;
  confirmResetPassword: UserFormResponse;
  contact: BooleanFormResponse;
  deleteUser: BooleanFormResponse;
  destroyUser: Scalars['Boolean']['output'];
  downloadLink: Scalars['String']['output'];
  login: UserFormResponse;
  logout: Scalars['Boolean']['output'];
  mkdir: Scalars['Boolean']['output'];
  newUser: Scalars['Boolean']['output'];
  register: BooleanFormResponse;
  resetPassword: BooleanFormResponse;
  resetUser: Scalars['Boolean']['output'];
  restore: Array<Scalars['Boolean']['output']>;
  rm: Array<Scalars['Boolean']['output']>;
  trash: Array<Scalars['Boolean']['output']>;
};


export type MutationConfirmDeleteUserArgs = {
  token: Scalars['String']['input'];
};


export type MutationConfirmRegisterArgs = {
  token: Scalars['String']['input'];
};


export type MutationConfirmResetPasswordArgs = {
  token: Scalars['String']['input'];
};


export type MutationContactArgs = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  password: Scalars['String']['input'];
};


export type MutationDestroyUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationDownloadLinkArgs = {
  paths: Array<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMkdirArgs = {
  dirname: Scalars['String']['input'];
};


export type MutationNewUserArgs = {
  inputs: RegisterInput;
};


export type MutationRegisterArgs = {
  inputs: RegisterInput;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResetUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  subscription?: Scalars['Boolean']['input'];
};


export type MutationRestoreArgs = {
  paths: Array<Scalars['String']['input']>;
};


export type MutationRmArgs = {
  paths: Array<Scalars['String']['input']>;
};


export type MutationTrashArgs = {
  paths: Array<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  diskUsage: Scalars['Int']['output'];
  ls: Array<DirectoryItem>;
  lsTrash: Array<TrashDirectoryItem>;
  search: Array<SearchDirectoryItem>;
  user?: Maybe<User>;
};


export type QueryLsArgs = {
  path?: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  pattern: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SearchDirectoryItem = {
  __typename?: 'SearchDirectoryItem';
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type TrashDirectoryItem = {
  __typename?: 'TrashDirectoryItem';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  time: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  currentSubscription: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  subscriptionSize: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type UserFormResponse = FormErrors | User;

export type DefaultUserFragment = { __typename?: 'User', id: number, username: string, email: string, currentSubscription: string, subscriptionSize: number };

export type ConfirmDeleteUserMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmDeleteUserMutation = { __typename?: 'Mutation', confirmDeleteUser: { __typename: 'BooleanResponse', response: boolean } | { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string, field?: string | null }> } };

export type ConfirmRegisterMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmRegisterMutation = { __typename?: 'Mutation', confirmRegister: { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string, field?: string | null }> } | { __typename: 'User', id: number, username: string, email: string, currentSubscription: string, subscriptionSize: number } };

export type ConfirmResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmResetPasswordMutation = { __typename?: 'Mutation', confirmResetPassword: { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string, field?: string | null }> } | { __typename: 'User', id: number, username: string, email: string, currentSubscription: string, subscriptionSize: number } };

export type ContactMutationVariables = Exact<{
  email: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type ContactMutation = { __typename?: 'Mutation', contact: { __typename: 'BooleanResponse', response: boolean } | { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string }> } };

export type DeleteUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename: 'BooleanResponse', response: boolean } | { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string }> } };

export type DownloadLinkMutationVariables = Exact<{
  paths: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DownloadLinkMutation = { __typename?: 'Mutation', downloadLink: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string, field?: string | null }> } | { __typename: 'User', id: number, username: string, email: string, currentSubscription: string, subscriptionSize: number } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MkdirMutationVariables = Exact<{
  dirname: Scalars['String']['input'];
}>;


export type MkdirMutation = { __typename?: 'Mutation', mkdir: boolean };

export type RegisterMutationVariables = Exact<{
  inputs: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'BooleanResponse', response: boolean } | { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string, field?: string | null }> } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename: 'BooleanResponse', response: boolean } | { __typename: 'FormErrors', errors: Array<{ __typename?: 'FormError', message: string, field?: string | null }> } };

export type RestoreMutationVariables = Exact<{
  paths: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RestoreMutation = { __typename?: 'Mutation', restore: Array<boolean> };

export type RmMutationVariables = Exact<{
  paths: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RmMutation = { __typename?: 'Mutation', rm: Array<boolean> };

export type TrashMutationVariables = Exact<{
  paths: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TrashMutation = { __typename?: 'Mutation', trash: Array<boolean> };

export type DuQueryVariables = Exact<{ [key: string]: never; }>;


export type DuQuery = { __typename?: 'Query', diskUsage: number };

export type LsQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type LsQuery = { __typename?: 'Query', ls: Array<{ __typename: 'DirectoryItem', name: string, type: string }> };

export type LsTrashQueryVariables = Exact<{ [key: string]: never; }>;


export type LsTrashQuery = { __typename?: 'Query', lsTrash: Array<{ __typename: 'TrashDirectoryItem', name: string, type: string, time: string, id: string }> };

export type SearchQueryVariables = Exact<{
  pattern: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename: 'SearchDirectoryItem', name: string, type: string, path: string }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, username: string, email: string, currentSubscription: string, subscriptionSize: number } | null };

export const DefaultUserFragmentDoc = gql`
    fragment DefaultUser on User {
  id
  username
  email
  currentSubscription
  subscriptionSize
}
    `;
export const ConfirmDeleteUserDocument = gql`
    mutation ConfirmDeleteUser($token: String!) {
  confirmDeleteUser(token: $token) {
    __typename
    ... on BooleanResponse {
      response
    }
    ... on FormErrors {
      errors {
        message
        field
      }
    }
  }
}
    `;

export function useConfirmDeleteUserMutation() {
  return Urql.useMutation<ConfirmDeleteUserMutation, ConfirmDeleteUserMutationVariables>(ConfirmDeleteUserDocument);
};
export const ConfirmRegisterDocument = gql`
    mutation ConfirmRegister($token: String!) {
  confirmRegister(token: $token) {
    __typename
    ... on User {
      ...DefaultUser
    }
    ... on FormErrors {
      errors {
        message
        field
      }
    }
  }
}
    ${DefaultUserFragmentDoc}`;

export function useConfirmRegisterMutation() {
  return Urql.useMutation<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>(ConfirmRegisterDocument);
};
export const ConfirmResetPasswordDocument = gql`
    mutation ConfirmResetPassword($token: String!) {
  confirmResetPassword(token: $token) {
    __typename
    ... on User {
      ...DefaultUser
    }
    ... on FormErrors {
      errors {
        message
        field
      }
    }
  }
}
    ${DefaultUserFragmentDoc}`;

export function useConfirmResetPasswordMutation() {
  return Urql.useMutation<ConfirmResetPasswordMutation, ConfirmResetPasswordMutationVariables>(ConfirmResetPasswordDocument);
};
export const ContactDocument = gql`
    mutation Contact($email: String!, $subject: String!, $message: String!) {
  contact(email: $email, subject: $subject, message: $message) {
    __typename
    ... on BooleanResponse {
      response
    }
    ... on FormErrors {
      errors {
        message
      }
    }
  }
}
    `;

export function useContactMutation() {
  return Urql.useMutation<ContactMutation, ContactMutationVariables>(ContactDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($password: String!) {
  deleteUser(password: $password) {
    __typename
    ... on BooleanResponse {
      response
    }
    ... on FormErrors {
      errors {
        message
      }
    }
  }
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const DownloadLinkDocument = gql`
    mutation DownloadLink($paths: [String!]!) {
  downloadLink(paths: $paths)
}
    `;

export function useDownloadLinkMutation() {
  return Urql.useMutation<DownloadLinkMutation, DownloadLinkMutationVariables>(DownloadLinkDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    __typename
    ... on User {
      ...DefaultUser
    }
    ... on FormErrors {
      errors {
        message
        field
      }
    }
  }
}
    ${DefaultUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MkdirDocument = gql`
    mutation Mkdir($dirname: String!) {
  mkdir(dirname: $dirname)
}
    `;

export function useMkdirMutation() {
  return Urql.useMutation<MkdirMutation, MkdirMutationVariables>(MkdirDocument);
};
export const RegisterDocument = gql`
    mutation Register($inputs: RegisterInput!) {
  register(inputs: $inputs) {
    __typename
    ... on BooleanResponse {
      response
    }
    ... on FormErrors {
      errors {
        message
        field
      }
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!, $password: String!) {
  resetPassword(email: $email, password: $password) {
    __typename
    ... on BooleanResponse {
      response
    }
    ... on FormErrors {
      errors {
        message
        field
      }
    }
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const RestoreDocument = gql`
    mutation Restore($paths: [String!]!) {
  restore(paths: $paths)
}
    `;

export function useRestoreMutation() {
  return Urql.useMutation<RestoreMutation, RestoreMutationVariables>(RestoreDocument);
};
export const RmDocument = gql`
    mutation Rm($paths: [String!]!) {
  rm(paths: $paths)
}
    `;

export function useRmMutation() {
  return Urql.useMutation<RmMutation, RmMutationVariables>(RmDocument);
};
export const TrashDocument = gql`
    mutation Trash($paths: [String!]!) {
  trash(paths: $paths)
}
    `;

export function useTrashMutation() {
  return Urql.useMutation<TrashMutation, TrashMutationVariables>(TrashDocument);
};
export const DuDocument = gql`
    query Du {
  diskUsage
}
    `;

export function useDuQuery(options?: Omit<Urql.UseQueryArgs<DuQueryVariables>, 'query'>) {
  return Urql.useQuery<DuQuery, DuQueryVariables>({ query: DuDocument, ...options });
};
export const LsDocument = gql`
    query Ls($path: String!) {
  ls(path: $path) {
    __typename
    name
    type
  }
}
    `;

export function useLsQuery(options: Omit<Urql.UseQueryArgs<LsQueryVariables>, 'query'>) {
  return Urql.useQuery<LsQuery, LsQueryVariables>({ query: LsDocument, ...options });
};
export const LsTrashDocument = gql`
    query LsTrash {
  lsTrash {
    __typename
    name
    type
    time
    id
  }
}
    `;

export function useLsTrashQuery(options?: Omit<Urql.UseQueryArgs<LsTrashQueryVariables>, 'query'>) {
  return Urql.useQuery<LsTrashQuery, LsTrashQueryVariables>({ query: LsTrashDocument, ...options });
};
export const SearchDocument = gql`
    query Search($pattern: String!) {
  search(pattern: $pattern) {
    __typename
    name
    type
    path
  }
}
    `;

export function useSearchQuery(options: Omit<Urql.UseQueryArgs<SearchQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchQuery, SearchQueryVariables>({ query: SearchDocument, ...options });
};
export const UserDocument = gql`
    query User {
  user {
    ...DefaultUser
  }
}
    ${DefaultUserFragmentDoc}`;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
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
        "kind": "UNION",
        "name": "BooleanFormResponse",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "BooleanResponse"
          },
          {
            "kind": "OBJECT",
            "name": "FormErrors"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BooleanResponse",
        "fields": [
          {
            "name": "response",
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
        "name": "FormError",
        "fields": [
          {
            "name": "field",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "message",
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
        "name": "FormErrors",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "FormError",
                    "ofType": null
                  }
                }
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
            "name": "confirmDeleteUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "BooleanFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "token",
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
            "name": "confirmRegister",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "UserFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "token",
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
            "name": "confirmResetPassword",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "UserFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "token",
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
            "name": "contact",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "BooleanFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "message",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "subject",
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
            "name": "deleteUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "BooleanFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "password",
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
            "name": "destroyUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "email",
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
            "name": "downloadLink",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
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
            "name": "login",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "UserFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
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
            "name": "logout",
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
            "name": "newUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "inputs",
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
            "name": "register",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "BooleanFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "inputs",
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
            "name": "resetPassword",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "BooleanFormResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
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
            "name": "resetUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "subscription",
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
            "name": "restore",
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
            "name": "trash",
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "diskUsage",
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
            "name": "lsTrash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TrashDirectoryItem",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "search",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SearchDirectoryItem",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "pattern",
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
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SearchDirectoryItem",
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
            "name": "path",
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
        "name": "TrashDirectoryItem",
        "fields": [
          {
            "name": "id",
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
            "name": "time",
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
        "name": "User",
        "fields": [
          {
            "name": "currentSubscription",
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
            "name": "email",
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
            "name": "id",
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
            "name": "subscriptionSize",
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
            "name": "username",
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
        "kind": "UNION",
        "name": "UserFormResponse",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "FormErrors"
          },
          {
            "kind": "OBJECT",
            "name": "User"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;