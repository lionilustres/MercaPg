const mercadopago = require('mercadopago');

// Configuración con access_token
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

// Crear el pago (usando PSE, por ejemplo)
const paymentData = {
  transaction_amount: 100,
  token: 'token_de_pago',  // Este token debe ser generado en el front-end
  description: 'Test Payment',
  installments: 1,
  payment_method_id: 'pse',
  payer: {
    email: 'payer@example.com'
  }
};

// Crear el pago con Mercado Pago
mercadopago.payment.save(paymentData).then(function(response) {
  console.log('Respuesta de Mercado Pago:', response);
}).catch(function(error) {
  console.error('Error al procesar el pago:', error);
});
