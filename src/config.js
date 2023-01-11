import { config } from "dotenv"
config();
export default {
    mongodbURL: process.env.MONGODB_URI,
    SECRETAPI_KEY: process.env.SECRETAPI 
}