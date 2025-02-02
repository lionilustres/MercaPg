// netlify/functions/mercadopago.js
const mercadopago = require('mercadopago');

exports.handler = async function(event, context) {
    // Verifica que se haya proporcionado el token de Mercado Pago
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Falta el token de acceso de Mercado Pago' })
        };
    }

    // Configura el token de Mercado Pago
    mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

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
