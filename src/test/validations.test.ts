import {
    validateCardNumber,
    validateExpirationMonth,
    validateEmail,
    validateCvv,
    validateYear,
    validatePk,
} from "../helpers/validations";
import { generateToken } from "../helpers/tokenize-card";

const data = {
    card: {
        email: "miguel.vegas@gmail.com ",
        card_number: "4985442010251457",
        cvv: "123",
        expiration_year: "2024",
        expiration_month: "4",
    },
    cardInvalid: {
        email: "miguel.vegas@gmail.com ",
        card_number: "3232232323232",
        cvv: "123",
        expiration_year: "2024",
        expiration_month: "4",
    },
    valid_pk_key: "Bearer pk_test_edhJUMpNqQy",
};

describe("Testing functionalities", () => {
    it("should return a valid token", () => {
        const token = generateToken();
        expect(token).toBeDefined();
        expect(typeof token).toBe("string");
        expect(token).toHaveLength(16);
    });

    it("Should return true when validating card_number", () => {
        const result = validateCardNumber(data.card.card_number);
        expect(result).toBe(true);
    });

    it("Should return true when validating expiration_month", () => {
        const result = validateExpirationMonth(data.card.expiration_month);
        expect(result).toBe(true);
    });

    it("Should return true when validating expiration_year", () => {
        const result = validateYear(data.card.expiration_year);
        expect(result).toBe(true);
    });

    it("Should return true when validating email", () => {
        const result = validateEmail(data.card.email);
        expect(result).toBe(true);
    });

    it("Should return true when validating cvv", () => {
        const result = validateCvv(data.card.cvv);
        expect(result).toBe(true);
    });

    it("Should return true when validating pk key", () => {
        const result = validatePk(data.valid_pk_key);
        expect(result).toBe(true);
    });
});
