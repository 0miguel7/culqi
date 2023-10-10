import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ICard } from "../infraestructure/card.dto";
import { generateToken } from "../helpers/tokenize-card";
import {
    validateCardNumber,
    validateExpirationMonth,
    validateEmail,
    validateCvv,
    validateYear,
    validatePk,
} from "../helpers/validations";
import { CardModel } from "../infraestructure/mongo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    try {
        const userCard: ICard = JSON.parse(event.body || "");

        if (!validatePk(event.headers.authorization)) throw Error("Llave Pk invalida");
        validateFields(userCard);
        const token = generateToken();
        const cardTokenized = { ...userCard, token };
        const card = new CardModel(cardTokenized);
        await card.save();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Tarjeta guardada y token generado",
                token,
            }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

const validateFields = (userCard: ICard) => {
    const { card_number, cvv, email, expiration_month, expiration_year } = userCard;

    if (!card_number || !validateCardNumber(card_number))
        throw Error("Numero de tarjeta invalido");

    if (!cvv || !validateCvv(cvv)) throw Error("Numero cvv proporcionado es inválido");

    if (!expiration_year || !validateYear(expiration_year)) throw Error("Año inválido");

    if (!email || !validateEmail(email))
        throw Error("El email proporcionado es invalido");

    if (!expiration_month || !validateExpirationMonth(expiration_month))
        throw Error("Cvv inválido");
};
