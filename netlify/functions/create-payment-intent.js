require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_API_KEY_PRIVATE)

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      payment_method_types: ['card'],
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    }
  } catch (error) {
    console.log({ error })

    return {
      status: 400,
      body: JSON.stringify({ error }),
    }
  }
}
