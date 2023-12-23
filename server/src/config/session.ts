import { SessionOptions } from "express-session";

export const session = {
  name: "qid",
  secret: process.env["SESSION_SECRET"] ?? "This is a secret in localhost.",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 24h
  },
} satisfies SessionOptions;

console.log(session);
