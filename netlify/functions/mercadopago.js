const mercadopago = require('mercadopago');

exports.handler = async (event, context) => {
  try {
    // Configura Mercado Pago con tus credenciales
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
    });

    // Crea la preferencia de pago
    let preference = {
      items: [
        {
          title: 'Producto de prueba',
          unit_price: 100,
          quantity: 1,
        }
      ],
      back_urls: {
        success: 'https://tu-sitio.com/success', // URL de éxito
        failure: 'https://tu-sitio.com/failure', // URL de fallo
        pending: 'https://tu-sitio.com/pending'  // URL de pendiente
      },
      auto_return: 'approved' // Redirige automáticamente al usuario
    };

    // Genera la preferencia
    const response = await mercadopago.preferences.create(preference);

    // Devuelve la información de la preferencia
    return {
      statusCode: 200,
      body: JSON.stringify({ preferenceId: response.body.id }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};