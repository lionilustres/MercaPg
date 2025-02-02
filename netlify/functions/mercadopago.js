const mercadopago = require('mercadopago').default;
const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    console.log("Función iniciada.");

    mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

    console.log("Mercado Pago configurado correctamente");

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
};
