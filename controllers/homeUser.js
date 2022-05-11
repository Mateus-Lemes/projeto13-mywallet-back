import db from "../db.js";

export async function homeUser(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        if (!token) {
            res.sendStatus(401);
        }

        const session = await db.collection("sessions").findOne({token});

        if(!session) {
            res.sendStatus(401);
        }
        const userID = session.userID
        const data = {
            deposits: await db.collection("deposits").find({userID}).toArray(),
            withdrawals: await db.collection("whitdrawals").find({userID}).toArray()
        }
        res.status(200).send(data)

    } catch (error) {
        return res.status(500).send("erro nas informações")
    }
}