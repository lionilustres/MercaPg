const mercadopago = require('mercadopago'); 
require('dotenv').config();

exports.handler = async function (event, context) {
    try {
        mercadopago.configure({
            access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
        });

        const preference = {
            items: [
                {
                    title: 'Producto de prueba',
                    quantity: 1,
                    currency_id: 'ARS',
                    unit_price: 100
                }
            ]
        };

        const response = await mercadopago.preferences.create(preference);

        return {
            statusCode: 200,
            body: JSON.stringify({ init_point: response.body.init_point })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
