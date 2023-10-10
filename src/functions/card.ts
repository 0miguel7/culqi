import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { validatePk } from "../helpers/validations";
import { CardModel } from "../infraestructure/mongo";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    try {
        if (!validatePk(event.headers.authorization))
            throw Error("La llave pk es invalida");

        const token = event.queryStringParameters?.token;
        const response = await CardModel.findOne({ token });
        if (!response) throw Error("No se encontró la tarjeta");

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Tarjeta encontrada satisfactoriamente",
                data: {
                    email: response.email,
                    card_number: response.card_number,
                    expiration_year: response.expiration_year,
                    expiration_month: response.expiration_month,
                },
            }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
