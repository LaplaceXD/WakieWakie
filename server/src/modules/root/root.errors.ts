import { ResponseCode } from "@/__generated__/gql";

export const UNAUTHENTICATED = Object.freeze({
  code: ResponseCode.Unauthenticated,
  success: false,
  message: "You must be logged in to access this resource.",
});

export const FORBIDDEN = Object.freeze({
  code: ResponseCode.Forbidden,
  success: false,
  message: "You must have the necessary permissions to access this resource.",
});

export const BAD_USER_INPUT = Object.freeze({
  code: ResponseCode.BadUserInput,
  success: false,
});
