import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import { UserModel } from "../database";
import { GraphQLContext } from "../types";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date | string | number; output: Date | string | number };
  JSON: { input: string | object; output: string | object };
  Timetz: { input: string; output: string };
};

/** The auth information of a given user. */
export type Auth = {
  __typename?: "Auth";
  /** The email of the user. */
  email: Scalars["String"]["output"];
  /** The date when the user last logged in. */
  lastLogin?: Maybe<Scalars["DateTime"]["output"]>;
  /** The username of the user */
  username: Scalars["String"]["output"];
};

/** The possible gender options of the user. */
export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
  Others = "OTHERS",
}

/** The possible interests of a user for dating. */
export enum Interest {
  Everyone = "EVERYONE",
  Female = "FEMALE",
  Male = "MALE",
}

export type Mutation = {
  __typename?: "Mutation";
  /** Login a registered user. */
  loginUser: UserResponse;
  /** Logs out the currently logged in user. */
  logoutUser: UserResponse;
  /** Register a user. */
  registerUser: UserResponse;
};

export type MutationLoginUserArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationRegisterUserArgs = {
  userDetails: RegisterInput;
};

export type Query = {
  __typename?: "Query";
  /** Get the currently logged in user. */
  me: UserResponse;
  ping: Scalars["String"]["output"];
};

/** The set of inputs required for registering a user. */
export type RegisterInput = {
  /** The time the user wakes up. */
  alarmTime: Scalars["Timetz"]["input"];
  /** A short bio descriptive of the user. */
  bio?: InputMaybe<Scalars["String"]["input"]>;
  /** The city where the user lives. */
  city?: InputMaybe<Scalars["String"]["input"]>;
  /** The country where the user lives. */
  country: Scalars["String"]["input"];
  /** The email of the user. This should be unique from user to user. */
  email: Scalars["String"]["input"];
  /** The user's first name. */
  firstName: Scalars["String"]["input"];
  /** The user's gender. */
  gender: Gender;
  /** The dating interests of the user. */
  interest: Interest;
  /** The user's last name. */
  lastName: Scalars["String"]["input"];
  /** The desired password of the user. */
  password: Scalars["String"]["input"];
  /** The username of the user. They will use this for logging in. */
  username: Scalars["String"]["input"];
};

/** Base interface for responses. */
export type Response = {
  /** Response code. */
  code: ResponseCode;
  /** Response message. */
  message: Scalars["JSON"]["output"];
  /** Boolean value which tells whether a certain operation was a success. */
  success: Scalars["Boolean"]["output"];
};

/** These are the possible response codes returned from a response. */
export enum ResponseCode {
  BadRequest = "BAD_REQUEST",
  BadUserInput = "BAD_USER_INPUT",
  Forbidden = "FORBIDDEN",
  Ok = "OK",
  Unauthenticated = "UNAUTHENTICATED",
}

/** The user schema. */
export type User = {
  __typename?: "User";
  /** The user's waking time. */
  alarmTime: Scalars["Timetz"]["output"];
  /** The auth information of a given user. */
  auth: Auth;
  /** The user's short descriptive bio. */
  bio: Scalars["String"]["output"];
  /** The user's city. */
  city: Scalars["String"]["output"];
  /** The user's country. */
  country: Scalars["String"]["output"];
  /** The date the user was created. */
  createdAt: Scalars["DateTime"]["output"];
  /** The user's first name. */
  firstName: Scalars["String"]["output"];
  /** The user's gender. */
  gender: Gender;
  /** The user's ID in the database. */
  id: Scalars["ID"]["output"];
  /** The user's interests. */
  interest: Interest;
  /** The user's last name. */
  lastName: Scalars["String"]["output"];
  /** The date the user was updated. */
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

/** Response object containing a user object. */
export type UserResponse = Response & {
  __typename?: "UserResponse";
  code: ResponseCode;
  message: Scalars["JSON"]["output"];
  success: Scalars["Boolean"]["output"];
  user?: Maybe<User>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Response: Omit<UserResponse, "user"> & { user?: Maybe<RefType["User"]> };
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Auth: ResolverTypeWrapper<Auth>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Interest: Interest;
  JSON: ResolverTypeWrapper<Scalars["JSON"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Response: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Response"]>;
  ResponseCode: ResponseCode;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Timetz: ResolverTypeWrapper<Scalars["Timetz"]["output"]>;
  User: ResolverTypeWrapper<UserModel>;
  UserResponse: ResolverTypeWrapper<Omit<UserResponse, "user"> & { user?: Maybe<ResolversTypes["User"]> }>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Auth: Auth;
  Boolean: Scalars["Boolean"]["output"];
  DateTime: Scalars["DateTime"]["output"];
  ID: Scalars["ID"]["output"];
  JSON: Scalars["JSON"]["output"];
  Mutation: {};
  Query: {};
  RegisterInput: RegisterInput;
  Response: ResolversInterfaceTypes<ResolversParentTypes>["Response"];
  String: Scalars["String"]["output"];
  Timetz: Scalars["Timetz"]["output"];
  User: UserModel;
  UserResponse: Omit<UserResponse, "user"> & { user?: Maybe<ResolversParentTypes["User"]> };
}>;

export type AuthResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Auth"] = ResolversParentTypes["Auth"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  loginUser?: Resolver<
    ResolversTypes["UserResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginUserArgs, "password" | "username">
  >;
  logoutUser?: Resolver<ResolversTypes["UserResponse"], ParentType, ContextType>;
  registerUser?: Resolver<
    ResolversTypes["UserResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterUserArgs, "userDetails">
  >;
}>;

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  me?: Resolver<ResolversTypes["UserResponse"], ParentType, ContextType>;
  ping?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}>;

export type ResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["Response"] = ResolversParentTypes["Response"],
> = ResolversObject<{
  __resolveType: TypeResolveFn<"UserResponse", ParentType, ContextType>;
  code?: Resolver<ResolversTypes["ResponseCode"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
}>;

export interface TimetzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Timetz"], any> {
  name: "Timetz";
}

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = ResolversObject<{
  alarmTime?: Resolver<ResolversTypes["Timetz"], ParentType, ContextType>;
  auth?: Resolver<ResolversTypes["Auth"], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  city?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  country?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes["Gender"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  interest?: Resolver<ResolversTypes["Interest"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends ResolversParentTypes["UserResponse"] = ResolversParentTypes["UserResponse"],
> = ResolversObject<{
  code?: Resolver<ResolversTypes["ResponseCode"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Auth?: AuthResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Timetz?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
}>;
