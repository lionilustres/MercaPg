const mercadopago = require('mercadopago');

// Configuración de MercadoPago: asegúrate de que la variable de entorno esté configurada
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

exports.handler = async function(event, context) {
    // Solo permitir solicitudes POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,  // Método no permitido
            body: JSON.stringify({ error: 'Método no permitido' }),
        };
    }

    // Asegurarnos de que recibimos los datos del producto
    const { product } = JSON.parse(event.body);

    if (!product || !product.name || !product.quantity || !product.price) {
        return {
            statusCode: 400,  // Bad Request
            body: JSON.stringify({ error: 'Datos del producto faltantes o incorrectos' }),
        };
    }

    // Configuración de la preferencia de pago en MercadoPago
    const preference = {
        items: [
            {
                title: product.name,
                quantity: product.quantity,
                currency_id: 'ARS',  // Ajusta la moneda si es necesario
                unit_price: product.price,
            },
        ],
        back_urls: {
            success: 'https://tudominio.com/success',
            failure: 'https://tudominio.com/failure',
            pending: 'https://tudominio.com/pending',
        },
        auto_return: 'approved',
    };

    try {
        // Crear la preferencia en MercadoPago
        const response = await mercadopago.preferences.create(preference);
        
        // Responder con la URL del pago (init_point)
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                init_point: response.body.init_point  // URL de pago para MercadoPago
            }),
        };
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        return {
            statusCode: 500,  // Internal Server Error
            body: JSON.stringify({ error: 'Error al crear la preferencia de pago' }),
        };
    }
};
