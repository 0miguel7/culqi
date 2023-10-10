import { model, connect } from "mongoose";
import { cardSchema } from "./card.schema";

export const CardModel = model("Card", cardSchema);

const run = async () => {
    await connect(
        "mongodb+srv://db_user_miguel:sucas123@cluster0.oegom.mongodb.net/culqi?retryWrites=true&w=majority"
    );
};

run().catch((err) => console.log(err));
