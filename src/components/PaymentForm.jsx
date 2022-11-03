import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const PaymentForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const { cartTotal } = useSelector((state) => state.cart)
  const { currentUser } = useSelector((state) => state.user)

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const result = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: cartTotal }),
    }).then((res) => res.json())

    const clientSecret = result.paymentIntent.client_secret

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.displayName,
        },
      },
    })

    if (paymentResult.error) {
      alert(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        setIsLoading(false)
        alert('Payment successful!')
      }
    }
  }

  return (
    <>
      <h1 className='mb-3 relative text-2xl font-medium text-gray-700 sm:text-3xl'>
        Secure Checkout<span className='mt-2 block h-1 w-10 bg-teal-600 sm:w-20'></span>
      </h1>
      <form onSubmit={paymentHandler}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '18px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          type='submit'
          className='group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 mt-5'
          disabled={!stripe || !elements}
        >
          {isLoading ? (
            <>
              Processing...
              <svg
                aria-hidden='true'
                className='ml-8 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </>
          ) : (
            <>
              Checkout
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
            </>
          )}
        </button>
      </form>
    </>
  )
}

export default PaymentForm
