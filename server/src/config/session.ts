import { SessionOptions } from "express-session";

export const session = {
  name: "qid",
  secret: "This is very secret.",
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain: "localhost",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 24h
  },
} satisfies SessionOptions;
