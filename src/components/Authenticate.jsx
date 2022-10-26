import {
  auth,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
} from '../utils/firebase/firebaseUtils'
import { useEffect, useState } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'
import Button from './Button'
import AlertBox from './AlertBox'

const Authenticate = () => {
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
  useEffect(() => {
    const handleRedirectResult = async () => {
      // get the redirect result from the signInWithGoogleRedirect() function
      const response = await getRedirectResult(auth)

      if (response) {
        // create a user document in the firestore database
        createUserDocumentFromAuth(response.user)
      }
    }

    handleRedirectResult()
  }, [])

  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup()
  //   const userDocRef = await createUserDocumentFromAuth(user)
  // }
  const signInGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect()
    // triggers the useEffect() hook above
  }
  //!! end of google sign in redirect

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('formFields', formFields)

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)

      if (response) {
        resetFormFields()
        console.log('successful sign in ✅ ', response)
      }
    } catch (error) {
      console.error(error)

      switch (error.code) {
        case 'auth/user-not-found':
          setErrorText('No existing user found with that email address')
          setTimeout(() => {
            setErrorText(null)
          }, 3000)

          break
        case 'auth/wrong-password':
          setErrorText('Incorrect password')
          setTimeout(() => {
            setErrorText(null)
          }, 3000)
          break
        default:
          setErrorText('Something went wrong')
      }
    }
  }

  return (
    <div className='flex flex-wrap'>
      <div className='flex w-full flex-col md:w-1/2'>
        <div className='lg:w-[28rem] mx-auto my-auto flex flex-col justify-center p-8 md:justify-start md:px-6 md:pt-4 bg-white rounded-lg'>
          <p className='text-left text-3xl font-bold'>Welcome back</p>
          <p className='mt-2 text-left text-gray-500'>Welcome back, please enter your details.</p>
          <button
            className='-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-secondary ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-blue-400 bg-secondary text-white hover:text-base-100'
            onClick={signInGoogleRedirectUser}
          >
            <img className='mr-2 h-5' src='https://static.cdnlogo.com/logos/g/35/google-icon.svg' />{' '}
            Log in with Google
          </button>
          <div className='relative mt-8 flex h-px place-items-center bg-base-100'>
            <div className='absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500'>
              or
            </div>
          </div>
          <form className='flex flex-col pt-3 md:pt-8' onSubmit={(e) => handleSubmit(e)}>
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
            <div className='mb-12 flex flex-col pt-4'>
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
            <p className='whitespace-nowrap text-gray-600'>
              Don&apos;t have an account?{' '}
              <Link
                to='/sign-up'
                className='underline-offset-4 font-semibold text-gray-900 underline'
              >
                Sign up for free.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className='pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2'>
        <div className='absolute bottom-0 z-10 px-8 text-white opacity-100'>
          <p className='mb-8 text-3xl font-semibold leading-10'>
            Love modern furnature? <br /> We do too.
          </p>
        </div>
        <img
          className='-z-1 absolute top-0 h-full w-full object-cover opacity-90'
          src='https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
        />
      </div>
    </div>
  )
}

export default Authenticate
