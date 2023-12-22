import { MutationResolvers, ResponseCode } from "@/__generated__/gql";
import { randomUUID } from "crypto";

const mutations: MutationResolvers = {
  sendMessage: async (_, { content }, { pubsub }) => {
    const msg = {
      id: randomUUID(),
      content,
    };

    await pubsub.publish("MESSAGE_SENT", {
      messages: msg,
    });

    return {
      code: ResponseCode.Ok,
      success: true,
      message: "Successfully sent message!",
      msg,
    };
  },
};

export default mutations;
