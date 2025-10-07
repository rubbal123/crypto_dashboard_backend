import { AccountApi } from "@safeheron/api-sdk";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.SAFEHERON_API_KEY || "";
const BASE_URL = process.env.SAFEHERON_API_BASE || "https://api.safeheron.com";

export const accountApi = new AccountApi({
      baseUrl: BASE_URL,
      apiKey: API_KEY,
      rsaPrivateKey: "file:./src/public/private/new-private-4096.pem",
      safeheronRsaPublicKey: "file:./src/public/public/platform-public-4096.pem",
      requestTimeout: 60000
  });

  

