import express from "express";
import cors from "cors";
import { login } from "./controllers/login.js";
import { signUp } from "./controllers/signUp.js";
import { addPositiveValue } from "./controllers/addPositiveValue.js";
import { addNegativeValue } from "./controllers/addNegativeValue.js";
import { homeUser } from "./controllers/homeUser.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/", login);

app.post("/sign-up", signUp);

app.post("/add-positive-value", addPositiveValue);

app.post("/add-negative-value", addNegativeValue);

app.get("/home-user", homeUser);




app.listen(5000, ()=> console.log("Servidor está de pé na porta 5000"));

