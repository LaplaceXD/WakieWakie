import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono().basePath("api/v1");

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
