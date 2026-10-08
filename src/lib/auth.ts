import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dns from "dns";

// Fix Windows MongoDB SRV DNS Lookup only on Windows
try {
  if (process.platform === "win32") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch {
  // Bypass DNS in Restricted Environments
}

// Active and verified MongoDB Atlas URI
const MONGODB_VERIFIED_URI =
  "mongodb+srv://princeling:rAnfWLiN4N31bEAR@cluster0.x00eiws.mongodb.net/bazardor?retryWrites=true&w=majority&appName=Cluster0";

function getMongoUri() {
  const envUri = process.env.MONGODB_URI;
  if (
    envUri &&
    envUri.trim().length > 0 &&
    !envUri.includes("mIziHrbdGW6Rotma") &&
    !envUri.includes("<db_password>") &&
    !envUri.includes("<password>")
  ) {
    return envUri;
  }
  return MONGODB_VERIFIED_URI;
}

let client: MongoClient | null = null;

function getMongoClient() {
  if (!client) {
    client = new MongoClient(getMongoUri());
  }
  return client;
}

function getMongoDatabase() {
  const c = getMongoClient();
  const dbName = process.env.MONGODB_DB_NAME || "bazardor";
  return c.db(dbName);
}

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

export const auth = betterAuth({
  database: mongodbAdapter(getMongoDatabase(), {
    client: getMongoClient(),
  }),
  secret: process.env.BETTER_AUTH_SECRET || "bazar-dor-super-secret-key-32-chars-long-12345",
  baseURL: getBaseURL(),
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 4,
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
});
