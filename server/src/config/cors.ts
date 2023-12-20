import { CorsOptions } from "cors";

export const cors = {
  origin: ["http://localhost:5173", "http://localhost:4000", "https://sandbox.embed.apollographql.com"],
  credentials: true,
} satisfies CorsOptions;
