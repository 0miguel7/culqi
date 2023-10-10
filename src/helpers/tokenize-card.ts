import { randomInt } from "crypto";

const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateToken = () => {
    let token = "";

    for (let i = 0; i < 16; i++) {
        const randomCharacter = randomInt(characters.length);
        token += characters.charAt(randomCharacter);
    }
    return token;
};
