import mercadopago from "mercadopago"
// Add Your credentials
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
})

async function paymentFunction() {
  let preference = {
    items: [
      {
        title: "My Item",
        unit_price: 100,
        quantity: 1,
      },
    ],
  }
  const res = await mercadopago.preferences.create(preference)
  return res
  //     const makePayment = mercadopago.preferences
  //     .create(preference)
  //     .then(function (response) {
  //         global.id = response.body.id
  //   })
  //   .catch(function (error) {
  //       console.log(error)
  //     })
}

export { paymentFunction }
