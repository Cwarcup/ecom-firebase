import { signInWithGoogleRedirect } from '../utils/firebase/firebaseUtils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'
import Button from './Button'
import AlertBox from './AlertBox'
import { useDispatch, useSelector } from 'react-redux'

// import the two methods of sign in from redux userSlice
import { signInUser, signInGoogleRedirect, currentUserSelector } from '../redux/slices/userSlice'

const Authenticate = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(currentUserSelector)
  console.log({ currentUser })

  // form fields
  // set the initial state of the form
  const defaultFormFields = {
    email: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const [errorText, setErrorText] = useState(null)

  //!! handles the google sign in redirect
  // is an async function that dispatches the signInGoogleRedirect action
  useEffect(() => {
    const handleGoogleSignIn = async () => {
      const response = await dispatch(signInGoogleRedirect())
      if (response.payload) {
        setErrorText(response.payload.message)
      }
    }

    handleGoogleSignIn()
  }, [])

  // used to send user to google login page
  const handleGoogleSignIn = () => {
    signInWithGoogleRedirect()
  }
  //!! end of google sign in redirect

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  // handles the sign in with email and password
  // async function that dispatches the signInUser action
  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault()

    const response = await dispatch(signInUser({ email, password }))
    if (response.payload) {
      setErrorText(response.payload.message)
    }

    resetFormFields()
  }

  // create a counter component to be displayed when the user is signed in
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (currentUser) {
      const timer = count > 0 && setInterval(() => setCount(count - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [count, currentUser])

  useEffect(() => {
    if (count === 0) {
      window.location.href = '/'
    }
  }, [count, currentUser])

  return (
    <div className='flex flex-wrap'>
      {currentUser ? (
        <div className='flex flex-col w-full md:w-1/2'>
          <div className='lg:w-[28rem] mx-auto my-auto flex flex-col justify-center p-8 md:justify-start md:px-6 md:pt-4 bg-white rounded-lg'>
            <p className='text-3xl font-bold text-left'>
              Welcome back, {currentUser?.user?.displayName}
            </p>
            <p className='mt-2 text-left text-gray-500'>
              You will be redirected home in {<span className='text-secondary'>{count}</span>}{' '}
              seconds
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full md:w-1/2'>
          <div className='lg:w-[28rem] mx-auto my-auto flex flex-col justify-center p-8 md:justify-start md:px-6 md:pt-4 bg-white rounded-lg'>
            <p className='text-3xl font-bold text-left'>Welcome back</p>
            <p className='mt-2 text-left text-gray-500'>Please enter your details.</p>
            <button
              className='flex items-center justify-center px-4 py-1 mt-8 text-white transition border rounded-md outline-none -2 ring-secondary ring-offset-2 focus:ring-2 hover:border-transparent hover:bg-blue-400 bg-secondary hover:text-base-100'
              onClick={handleGoogleSignIn}
            >
              <img
                className='h-5 mr-2'
                src='https://static.cdnlogo.com/logos/g/35/google-icon.svg'
              />{' '}
              Log in with Google
            </button>
            <div className='relative flex h-px mt-8 place-items-center bg-base-100'>
              <div className='absolute h-6 text-sm text-center text-gray-500 -translate-x-1/2 bg-white left-1/2 w-14'>
                or
              </div>
            </div>
            <form className='flex flex-col pt-3 md:pt-8' onSubmit={handleEmailPasswordSignIn}>
              <div className='flex flex-col pt-4'>
                <FormInput
                  label='Email'
                  onChange={(e) => handleChange(e)}
                  type='email'
                  name='email'
                  required
                  value={email}
                />
              </div>
              <div className='flex flex-col pt-4 mb-12'>
                <FormInput
                  label='Password'
                  onChange={(e) => handleChange(e)}
                  type='password'
                  name='password'
                  required
                  value={password}
                />
                {errorText && <AlertBox color={'red'}>{errorText}</AlertBox>}
                <Button type='submit'>Log in</Button>
              </div>
            </form>
            <div className='py-12 text-center'>
              <p className='text-gray-600 whitespace-nowrap'>
                Don&apos;t have an account?{' '}
                <Link
                  to='/sign-up'
                  className='font-semibold text-gray-900 underline underline-offset-4'
                >
                  Sign up for free.
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className='relative hidden h-screen bg-black pointer-events-none select-none md:block md:w-1/2'>
        <img
          className='absolute top-0 object-cover w-full h-full -z-1 '
          src='https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg'
        />
      </div>
    </div>
  )
}

export default Authenticate
