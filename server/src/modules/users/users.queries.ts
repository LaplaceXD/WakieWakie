import { QueryResolvers } from "@/__generated__/gql";
import { db } from "@/database";

export const queries: QueryResolvers = {
  users: () => {
    return db.query.users.findMany({
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        bio: true,
        gender: true,
        interest: true,
        city: true,
        country: true,
        alarmTime: true,
      },
    });
  },
};
