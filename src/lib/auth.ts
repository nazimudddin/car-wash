import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("car-wash-system");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
   user: {
       additionalFields: {
          role: {
              type: ["admin", "user","branch-manager"],
              input: false,
              defaultValue:"user"
            } 
        }
    },
 emailAndPassword: { 
    enabled: true, 
  }, 
});