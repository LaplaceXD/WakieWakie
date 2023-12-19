import { MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { auth, db, users } from "@/database";
import { hash, parseZodErrors } from "@/utils";
import { userSchema } from "./users.validation";

export const mutations: MutationResolvers = {
  registerUser: async (_, { input }) => {
    const validatedInput = await userSchema.safeParseAsync(input);
    if (!validatedInput.success) {
      return {
        code: ResponseCode.BadUserInput,
        success: false,
        message: JSON.stringify(parseZodErrors(validatedInput.error.errors)),
        user: null,
      };
    }

    try {
      const user = await db.transaction(async tx => {
        const { email, username, password, ...userData } = validatedInput.data;
        const hashedPassword = await hash.hashPassword(password);

        const [user] = await tx.insert(users).values(userData).returning();
        if (!user) return tx.rollback();

        const authResult = await tx.insert(auth).values({ id: user.id, email, username, password: hashedPassword });
        if (authResult.changes === 0) return tx.rollback();

        return user;
      });

      if (!user) throw new Error("An error occurred internally.");

      return {
        code: ResponseCode.Ok,
        success: true,
        message: "User successfully registered!",
        user,
      };
    } catch {
      return {
        code: ResponseCode.InternalServerError,
        success: false,
        message: "An error occured internally.",
        user: null,
      };
    }
  },
};
