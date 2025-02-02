const mercadopago = require("mercadopago");

exports.handler = async (event, context) => {
  try {
    console.log("Función iniciada.");

    // Asegúrate de que la variable de entorno está definida
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN no está definido.");
    }

    // Configuración correcta
    mercadopago.configurations.setAccessToken(accessToken);

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
