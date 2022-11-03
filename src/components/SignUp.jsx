import { Link } from 'react-router-dom'
import { useState } from 'react'

import FormInput from './FormInput'
import Button from './Button'
import AlertBox from './AlertBox'
import { useDispatch } from 'react-redux'
// use signUpUser action creator to sign up the user
import { signUpUser } from '../redux/slices/userSlice.js'

const SignUp = () => {
  const dispatch = useDispatch()

  // set the initial state of the form
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password } = formFields
  const [errorText, setErrorText] = useState(null)

  const [data, setData] = useState({})

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  // async function that dispatches the signUpUser action
  // if the response has a payload, set the errorText state to the error message
  const handleSignUp = async (e) => {
    e.preventDefault()

    const response = await dispatch(signUpUser({ displayName, email, password }))

    if (response.error) {
      setErrorText(response.error.message)
    }

    resetFormFields()
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
            <form className='mt-8' onSubmit={handleSignUp}>
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
              <p>{console.log(data)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
