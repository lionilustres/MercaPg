const mercadopago = require('mercadopago').default;
const axios = require('axios');


exports.handler = async (event, context) => {
  try {
    console.log("Función iniciada."); // Mensaje de prueba

        mercadopago.configure({
            access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
        })

        console.log("Mercado Pago configurado")

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "¡Hola desde mi función!" }),
    };
  } catch (error) {
    console.error("Error en la función:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}