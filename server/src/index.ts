import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
app.get("/", c => c.text("Hello Hono!"));

serve(app, ({ address, port }) => {
  const protocol = address === "0.0.0.0" ? "http" : "https";
  const name = address === "0.0.0.0" ? "localhost" : address;

  console.log(`Server running at ${protocol}://${name}:${port}`);
});
