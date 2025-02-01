const mercadopago = require("mercadopago");

exports.handler = async (event, context) => {
  try {
    // Verifica si la variable de entorno está disponible
    console.log("Access Token:", process.env.MERCADO_PAGO_ACCESS_TOKEN);

    mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});
console.log("Mercado Pago SDK:", mercadopago);


    // Obtiene los datos del pago del body de la solicitud
    const { body } = event;
    const paymentData = JSON.parse(body);

    console.log("Datos de pago recibidos:", paymentData);

    // Crea el pago con Mercado Pago
    const payment = await mercadopago.payment.create(paymentData);

    console.log("Respuesta de Mercado Pago:", payment);

    // Devuelve la respuesta de Mercado Pago al cliente
    return {
      statusCode: 200,
      body: JSON.stringify(payment.response),
    };
  } catch (error) {
    console.error("Error en la función de Mercado Pago:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, details: error }),
    };
  }
};
