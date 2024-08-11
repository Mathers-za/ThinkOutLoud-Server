import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING!;
export const config = {
  mongo: { url: MONGO_CONNECTION_STRING },
  server: { port: SERVER_PORT },
};
