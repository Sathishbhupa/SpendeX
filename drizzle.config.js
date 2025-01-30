import { DrizzleConfig } from "drizzle-orm";

export default {
    dialect: "postgresql",
    schema: "./utils/schema.jsx",
    out: "./drizzle",
    dbCredentials: {
      url: NEXT_PUBLIC_DATABASE_URL,
      connectionString: NEXT_PUBLIC_DATABASE_URL,
    },
  }; 