const mercadopago = require("mercadopago");

exports.handler = async (event, context) => {
  try {
    // Verifica si la variable de entorno está bien cargada
    console.log("Access Token:", process.env.MERCADO_PAGO_ACCESS_TOKEN);

    // Asegúrate de que la variable de entorno no esté vacía
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      throw new Error("El Access Token no está configurado en las variables de entorno.");
    }

    // Asigna el token directamente, ya que configure() no existe en la versión 2.3.0+
    mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

    console.log("Mercado Pago configurado correctamente.");

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
