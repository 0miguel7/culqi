import { model, connect } from "mongoose";
import { cardSchema } from "./card.schema";
import * as dotenv from "dotenv";
dotenv.config();

export const CardModel = model("Card", cardSchema);

const run = async () => {
    await connect(
        process.env.MONGO_URI ||
            "mongodb+srv://db_user_miguel:sucas123@cluster0.oegom.mongodb.net/?retryWrites=true&w=majority"
    );
};

run().catch((err) => console.log(err));
