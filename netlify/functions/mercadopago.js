import * as mercadopago from 'mercadopago';

export const handler = async (event, context) => {
  try {
    // Configura Mercado Pago con tu access token.
    // ¡Recuerda que este token debe estar en las variables de entorno de Netlify!
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });

    try {
        // Crear la preferencia de pago
        const preference = {
            items: [
                {
                    title: 'Mi Producto',
                    quantity: 1,
                    currency_id: 'ARS',
                    unit_price: 100
                }
            ],
            back_urls: {
                success: 'https://tusitio.com/success',
                failure: 'https://tusitio.com/failure',
                pending: 'https://tusitio.com/pending'
            },
            auto_return: 'approved'
        };

        // Crea la preferencia de pago
        const response = await mercadopago.preferences.create(preference);

        // Devuelve la URL de pago generada por Mercado Pago
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                link: response.body.init_point
            })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al crear la preferencia de pago' })
        };
    }
};
