export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
    return emailRegex.test(email.trim());
};

export const validateCvv = (cvv: string) => {
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(cvv);
};

export const validateCardNumber = (cardNumber: string) => {
    const digits = cardNumber.trim().split("").reverse().map(Number);

    for (let i = 1; i < digits.length; i += 2) {
        digits[i] *= 2;
        if (digits[i] >= 10) {
            digits[i] -= 9;
        }
    }

    const sumaTotal = digits.reduce((total, digit) => total + digit, 0);

    return sumaTotal % 10 === 0;
};

export const validateYear = (year: string) => {
    const actualYear = new Date().getFullYear();
    const expirationYear = parseInt(year.trim(), 10);
    return (
        !isNaN(expirationYear) &&
        expirationYear >= actualYear &&
        expirationYear <= actualYear + 5
    );
};

export const validateExpirationMonth = (m: string) => {
    const month = m.trim();
    if (month.length > 2) return false;
    if (month.split("")[0] === "0") {
        const digit = parseInt(month.split("")[1]);
        return digit > 0 && digit < 10;
    }
    const digit = parseInt(month);
    return digit > 0 && digit < 13;
};

export const validatePk = (key: string | undefined) => {
    if (!key) throw Error("No se encontro la llave pk");

    const keyParts = key.includes("Bearer")
        ? key.split(" ")[1].split("_")
        : key.split("_");
    return keyParts[0] === "pk" && keyParts[1] === "test";
};
