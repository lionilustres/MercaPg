const MercadoPago = require('mercadopago/lib/mercadoPago'); 
const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    console.log("Función iniciada.");

    const mercadopago = new MercadoPago({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
    });

    console.log("Mercado Pago configurado");

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
