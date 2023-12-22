import { and, eq, isNull, or, sql } from "drizzle-orm";
import { z } from "zod";

import { MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { auth, db, users } from "@/database";
import { InternalServerError, UnauthenticatedError } from "@/errors";
import { hash, parseZodErrors } from "@/utils";

import { userSchema } from "./auth.validation";

const mutations: MutationResolvers = {
  loginAccount: async (_, { username, password }, { session }) => {
    if (session.user) {
      return {
        code: ResponseCode.BadRequest,
        success: false,
        message: "You are already logged in.",
        user: null,
      };
    }

    const INVALID_CREDENTIALS_RESPONSE = {
      code: ResponseCode.BadUserInput,
      success: false,
      message: "You inputted an invalid username or password. Please Try Again.",
      user: null,
    };

    const validatedUsername = z.union([z.string().email(), z.string().regex(/[A-Za-z0-9_]+/)]).safeParse(username);
    if (!validatedUsername.success) return INVALID_CREDENTIALS_RESPONSE;

    try {
      const [authInfo] = await db
        .update(auth)
        .set({ lastLogin: sql`now()` })
        .where(
          and(
            isNull(auth.deletedAt),
            or(eq(auth.email, validatedUsername.data), eq(auth.username, validatedUsername.data)),
          ),
        )
        .returning();
      if (!authInfo) return INVALID_CREDENTIALS_RESPONSE;

      const isPasswordCorrect = await hash.verifyPassword(password, authInfo.password);
      if (!isPasswordCorrect) return INVALID_CREDENTIALS_RESPONSE;

      const [user] = await db.select().from(users).where(eq(users.id, authInfo.id));
      if (!user) throw new Error(`User ${auth.id} does not have a corresponding profile.`);

      session.user = user;
      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Logged in successfully!",
        user,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  registerAccount: async (_, { userDetails }) => {
    const validated = await userSchema.safeParseAsync(userDetails);
    if (!validated.success) {
      return {
        code: ResponseCode.BadUserInput,
        success: false,
        message: JSON.stringify(parseZodErrors(validated.error.errors)),
        user: null,
      };
    }

    try {
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
      if (!user) throw new Error(`User ${auth.id} does not have a corresponding profile.`);

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Registered successfully!",
        user,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  logoutAccount: async (_, __, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const user = session.user;
      await new Promise((resolve, reject) => session.destroy(err => (err ? reject(err) : resolve(true))));

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Logged out successfully!",
        user,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
  deleteAccount: async (_, __, { session }) => {
    if (!session.user) throw new UnauthenticatedError();

    try {
      const user = session.user;
      const [authAccount] = await db
        .update(auth)
        .set({ deletedAt: sql`now()` })
        .where(eq(auth.id, user.id))
        .returning();
      if (!authAccount) throw new Error(`User ${auth.id} does not have a corresponding profile.`);

      await new Promise((resolve, reject) => session.destroy(err => (err ? reject(err) : resolve(true))));

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "Deleted successfully!",
        user,
      };
    } catch (err) {
      throw new InternalServerError(err as Error);
    }
  },
};

export default mutations;
