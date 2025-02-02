const mercadopago = require('mercadopago');

exports.handler = async (event, context) => {
  try {
    // Configura Mercado Pago (¡SIN usar 'new'!)
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });

    console.log("Mercado Pago configurado.");

    const { body } = event;
    const paymentData = JSON.parse(body);

    console.log("Datos de pago recibidos:", paymentData);

    const payment = await mercadopago.payments.create(paymentData);

    console.log("Respuesta de Mercado Pago:", payment);

    return {
      statusCode: 200,
      body: JSON.stringify(payment),
    };
  } catch (error) {
    console.error("Error en la función de Mercado Pago:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, details: error }),
    };
  }
};