import { Schema } from "mongoose";

export const cardSchema = new Schema({
    email: { type: String, required: true },
    card_number: { type: String, required: true },
    cvv: { type: String, required: true },
    expiration_year: { type: String, required: true },
    expiration_month: { type: String, required: true },
    token: { type: String, required: true },
    expire: { type: Date, expires: "15m", default: Date.now },
});
