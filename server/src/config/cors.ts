import { CorsOptions } from "cors";

export const cors = {
  origin: [
    ...(process.env["CORS_ORIGIN"] ?? "").split(" "),
    ...(process.env["NODE_ENV"] === "production" ? [] : ["http://localhost:5173", "http://localhost:4000"]),
  ],
  credentials: true,
} satisfies CorsOptions;
