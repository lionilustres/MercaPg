const MercadoPago = require('mercadopago'); 
const axios = require('axios');

exports.handler = async (event, context) => {
  console.log("Starting Mercado Pago test...");
  console.log("mercadopago object:", mercadopago); // Log the object itself

  if (mercadopago && mercadopago.configure) { // Check if configure exists
    console.log("mercadopago.configure function exists!");
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });
    console.log("Mercado Pago configured (hopefully).");
    return { statusCode: 200, body: "Mercado Pago test successful." };
  } else {
    console.log("mercadopago.configure function does NOT exist!");
    return { statusCode: 500, body: "mercadopago.configure is missing!" };
  }
};