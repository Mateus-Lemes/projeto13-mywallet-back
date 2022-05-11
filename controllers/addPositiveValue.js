import joi from "joi";
import dayjs from "dayjs";
import db from "../db.js";

export async function addPositiveValue(req, res) {
    const {value, description} = req.body;
    const {authorization} = req.headers;
    const date = dayjs().format("DD/MM");

    const userSchema = joi.object({
        value: joi.number().required(), 
        description: joi.string().required()
    })

    const validation = userSchema.validate({
        value,
        description
    }, {abortEarly: false});

    if (validation.error) {
        console.log(validation.error.details);
    }

    const token = authorization?.replace("Bearer ", "");

    try {
        if (!token) {
            res.sendStatus(401);
        }

        const session = await db.collection("sessions").findOne({token});

        if (session) {
            db.collection("deposits").insertOne({
                value,
                description,
                date,
                userID: session.userID
            })
        }

        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500);
        console.log("Erro");
    }
}