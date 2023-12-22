import { ApolloServerErrorCode } from "@apollo/server/errors";
import { eq, or, sql } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { z } from "zod";

import { MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { auth, db, users } from "@/database";
import { errors } from "@/modules/root";
import { hash, parseZodErrors } from "@/utils";

import { userSchema } from "./auth.validation";

export const mutations: MutationResolvers = {
  loginUser: async (_, { username, password }, { session }) => {
    if (session.user) {
      return {
        code: ResponseCode.BadRequest,
        success: false,
        message: "You are already logged in.",
        user: null,
      };
    }

    const INVALID_CREDENTIALS_RESPONSE = {
      ...errors.BAD_USER_INPUT,
      message: "You have inputted an invalid username or password. Please try again.",
      user: null,
    };

    const validatedUsername = z.union([z.string().email(), z.string().regex(/[A-Za-z0-9_]+/)]).safeParse(username);
    if (!validatedUsername.success) return INVALID_CREDENTIALS_RESPONSE;

    const [authInfo] = await db
      .update(auth)
      .set({ lastLogin: sql`now()` })
      .where(or(eq(auth.email, validatedUsername.data), eq(auth.username, validatedUsername.data)))
      .returning();
    if (!authInfo) return INVALID_CREDENTIALS_RESPONSE;

    const isPasswordCorrect = await hash.verifyPassword(password, authInfo.password);
    if (!isPasswordCorrect) return INVALID_CREDENTIALS_RESPONSE;

    const [user] = await db.select().from(users).where(eq(users.id, authInfo.id));
    if (!user) {
      throw new GraphQLError(`User ${auth.id} does not have a corresponding profile.`, {
        extensions: {
          http: { status: 500 },
          code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        },
      });
    }

    session.user = user;

    return {
      code: ResponseCode.Ok,
      success: true,
      message: "Logged in successfully.",
      user,
    };
  },
  registerUser: async (_, { userDetails }) => {
    const validated = await userSchema.safeParseAsync(userDetails);
    if (!validated.success) {
      return {
        ...errors.BAD_USER_INPUT,
        message: JSON.stringify(parseZodErrors(validated.error.errors)),
        user: null,
      };
    }

    const user = await db.transaction(async tx => {
      const { email, username, password, ...userInput } = validated.data;
      const hashedPassword = await hash.hashPassword(password);

      const [userData] = await tx.insert(users).values(userInput).returning();
      if (!userData) return tx.rollback();

      const [authData] = await tx
        .insert(auth)
        .values({ id: userData.id, email, username, password: hashedPassword })
        .returning();
      if (!authData) return tx.rollback();

      return userData;
    });
    if (!user) {
      throw new GraphQLError("An error ocurred while inserting registering user.", {
        extensions: {
          http: { status: 500 },
          code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        },
      });
    }

    return {
      code: ResponseCode.Ok,
      success: true,
      message: "Registered successfully!",
      user,
    };
  },
  logoutUser: async (_, __, { session }) => {
    if (!session.user) return { ...errors.UNAUTHENTICATED, user: null };

    const user = session.user;
    await new Promise((resolve, reject) => session.destroy(err => (err ? reject(err) : resolve(true))));

    return {
      code: ResponseCode.Ok,
      success: true,
      message: "Logged out successfully!",
      user,
    };
  },
};
