import * as mercadopago from 'mercadopago';

export const handler = async (event, context) => {
  try {
    // Configura Mercado Pago con tu access token.
    // ¡Recuerda que este token debe estar en las variables de entorno de Netlify!
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });

    // Imprime un mensaje en la consola para verificar que la configuración fue exitosa.
    console.log("Mercado Pago configurado.");

    // Obtén los datos del pago del cuerpo de la solicitud.
    const { body } = event;
    const paymentData = JSON.parse(body);

    // Imprime los datos del pago en la consola para depuración.
    console.log("Datos de pago recibidos:", paymentData);

    // Crea el pago con Mercado Pago.
    const payment = await mercadopago.payments.create(paymentData);

    // Imprime la respuesta de Mercado Pago en la consola para depuración.
    console.log("Respuesta de Mercado Pago:", payment);

    // Devuelve la respuesta de Mercado Pago al cliente.
    return {
      statusCode: 200,
      body: JSON.stringify(payment),
    };
  } catch (error) {
    // Imprime el error en la consola para depuración.
    console.error("Error en la función de Mercado Pago:", error);

    // Devuelve un error al cliente.
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, details: error }),
    };
  }
};