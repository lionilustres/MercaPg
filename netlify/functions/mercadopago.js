const mercadopago = require('mercadopago');

// Configuración con access_token
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

// Crear el pago (usando PSE, por ejemplo)
const paymentData = {
  transaction_amount: 100,
  token: 'token_de_pago',
  description: 'Test Payment',
  installments: 1,
  payment_method_id: 'pse',
  payer: {
    email: 'payer@example.com'
  }
};

mercadopago.payment.save(paymentData).then(function(response) {
  console.log(response);
}).catch(function(error) {
  console.error(error);
});
