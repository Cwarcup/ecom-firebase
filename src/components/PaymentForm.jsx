import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
  }

  return (
    <div className='mt-6 text-center'>
      <form onSubmit={paymentHandler}>
        <CardElement />
        <button
          type='submit'
          className='group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 mt-5'
          disabled={!stripe || !elements}
        >
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
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
