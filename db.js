import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
    await mongoClient.connect();
	db = mongoClient.db("mywallet");
    console.log("o servidor está de pé");
} catch (error) {
    console.log("não foi possível acessar o servidor");
}

export default db;
