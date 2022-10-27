import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebaseUtils'
import FormInput from './FormInput'
import Button from './Button'
// import { UserContext } from '../context/UserContext'
import AlertBox from './AlertBox'

const SignUp = () => {
  // set the initial state of the form
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password } = formFields
  const [errorText, setErrorText] = useState(null)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password)

      if (response) {
        // create a user document in the firestore database
        // also pass the displayName from the form. This is passed as an additionalInformationObj to the createUserDocumentFromAuth() function
        await createUserDocumentFromAuth(response.user, { displayName })
        resetFormFields()
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorText('Email already in use')
          break
        case 'auth/invalid-email':
          setErrorText('Invalid email')
          break
        case 'auth/weak-password':
          setErrorText('Password is too weak')
          break
        default:
          setErrorText('Something went wrong')
      }

      setTimeout(() => {
        setErrorText(null)
      }, 3000)

      console.error(error)
    }
  }

  return (
    <div className='flex h-screen w-full items-center justify-center bg-base-100'>
      <div className='w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex'>
        <div
          className='m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80)',
          }}
        ></div>
        <div className='w-full sm:w-3/5'>
          <div className='p-8'>
            <h1 className='text-3xl font-black text-slate-700'>Sign up</h1>
            <p className='mt-2 mb-5 text-base leading-tight text-gray-600'>
              Create an account to get started.
            </p>
            <form className='mt-8' onSubmit={(e) => handleSubmit(e)}>
              <FormInput
                label='Display Name'
                onChange={(e) => handleChange(e)}
                name='displayName'
                type='text'
                required
                value={displayName}
              />
              <FormInput
                label='Email'
                onChange={(e) => handleChange(e)}
                type='email'
                name='email'
                required
                value={email}
              />

              <FormInput
                label='Password'
                onChange={(e) => handleChange(e)}
                type='password'
                name='password'
                required
                value={password}
              />

              <Button onChange={(e) => handleChange(e)} type='submit' value='Create account'>
                Create account
              </Button>
              {errorText && <AlertBox color={'blue'}>{errorText}</AlertBox>}
            </form>
            <div className='mt-4 text-center'>
              <p className='text-sm text-gray-600'>
                Already have an account?{' '}
                <Link
                  to='/sign-in'
                  className='font-bold text-secondary no-underline hover:text-blue-400'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
