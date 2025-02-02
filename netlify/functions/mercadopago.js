const mercadopago = require('mercadopago');

exports.handler = async (event, context) => {
  console.log("mercadopago object:", mercadopago); // Log the object
  return {
    statusCode: 200,
    body: "Test complete. Check logs."
  };
};