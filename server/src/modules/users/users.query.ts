import { QueryResolvers, ResponseCode } from "@/__generated__/gql";
import { errors } from "@/modules/root";

export const queries: QueryResolvers = {
  me: (_, __, { session }) => {
    if (!session.user) return { ...errors.UNAUTHENTICATED, user: null };

    return {
      code: ResponseCode.Ok,
      success: true,
      message: "Queried successfully!",
      user: session.user,
    };
  },
};
