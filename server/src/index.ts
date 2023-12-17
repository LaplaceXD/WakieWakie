import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

const app = new Hono().basePath("api/v1");

app.use("*", cors());
app.use("*", logger());
app.use("*", compress());
app.use("*", secureHeaders());

app.get("/ping", async c => {
  return c.json({ message: "PONG!" });
});

app.get("/health", async c => {
  return c.json({ ok: true });
});

serve(app, ({ address, port }) => {
  const isLocalHost = "0.0.0.0" === address;
  const name = isLocalHost ? "http" : "https";
  const addressName = isLocalHost ? "localhost" : address;

  console.log(`Server running at ${name}://${addressName}:${port}`);
});
