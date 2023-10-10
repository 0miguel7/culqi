## Challenge Tokenizer

Se usó AWS Lambda para hacer el deploy de las 2 funciones requeridas

-   Card: Recibe la información de una tarjeta, realiza las validaciones a los campos recibidos, genera un token, el cual es guardado en una base de datos junto con la informacion de la tarjeta con un tiempo de vida de 15 minutos. Finalmente devuelve el token como respuesta de la petición

-   Token: Recibe un token como dentro de los parametros de la URL, y busca la información de la tarjeta en la base datos, devolviendo los datos encontrados menos el cvv de la tarjeta

### Ejecutar localmente

Para ejecutar el proyecto es necesario:

-   Clonar el repositorio
-   Tener instalado Node Js
-   Ejecutar los siguientes comandos en la carpeta del proyecto

Instalar las dependencias

```bash
npm i
```

Ejecutar serverless offline

```bash
npm run dev
```

### Endpoints

    POST  /tokens

-   Request:

```json
{
    "email": "miguel.vegas@gmail.com ",
    "card_number": "4985442010251457",
    "cvv": "123",
    "expiration_year": "2024",
    "expiration_month": "04"
}
```

-   Response:

```json
{
    "message": "Tarjeta guardada y token generado",
    "token": "rWpYf0Cdu5MiMQpL"
}
```

    GET   /cards?token=xxxxxxxxxxxxxxx

-   Response:

```json
{
    "message": "Tarjeta encontrada satisfactoriamente",
    "data": {
        "email": "miguel.vegas@gmail.com ",
        "card_number": "4985442010251457",
        "expiration_year": "2024",
        "expiration_month": "4"
    }
}
```

Para ambos casos es necesario que el header del request tenga una llave PK:

```bash
  pk_test_LsRBKejzCOEEWOsm
```

### Funciones Desplegadas

Las url base para probar las funciones lambda desplegadas son las siguientes:

-   https://98wliex1tc.execute-api.us-east-1.amazonaws.com/
