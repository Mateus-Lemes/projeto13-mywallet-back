import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js"

export async function login(req, res) {
    const {email, password} = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.required()
    });

    const validation = userSchema.validate({
        email,
        password
    });

    if (validation.error) {
        console.log(validation.error.details);
    }

    const loggedUser = await db.collection("users").findOne({email});

    if (loggedUser && bcrypt.compareSync(password, loggedUser.password)) {
        const token = uuid();

        await db.collection("sessions").insertOne({
            userID: loggedUser._id,
            token
        })

        res.status(200).send({
            token,
            name: loggedUser.name
        })
    } else {
        res.status(404).send("404 error not found");
    }
}