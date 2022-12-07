import { Link } from 'react-router-dom'
import { useState } from 'react'
import FormInput from './FormInput'
import Button from './Button'
import AlertBox from './AlertBox'
import { useDispatch } from 'react-redux'
import { signUpUser } from '../redux/slices/userSlice'

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
    <div className='flex flex-wrap'>
      <div className='flex flex-col w-full md:w-1/2'>
        <div className='lg:w-[28rem] mx-auto my-auto flex flex-col justify-center p-8 md:justify-start md:px-6 md:pt-4 bg-white rounded-lg'>
          <p className='text-3xl font-bold text-left'>Welcome!</p>
          <p className='mt-2 text-left text-gray-500'>
            Please enter your details below to create an account.
          </p>

          <form className='flex flex-col pt-3 md:pt-8' onSubmit={handleSignUp}>
            <div className='flex flex-col pt-4'>
              <FormInput
                label='Display Name'
                onChange={(e) => handleChange(e)}
                name='displayName'
                type='text'
                required
                value={displayName}
              />
            </div>
            <div className='flex flex-col pt-4 mb-12'>
              <FormInput
                label='Email'
                onChange={(e) => handleChange(e)}
                type='email'
                name='email'
                required
                value={email}
              />
              <div className='flex flex-col pt-4 mb-12'>
                <FormInput
                  label='Password'
                  onChange={(e) => handleChange(e)}
                  type='password'
                  name='password'
                  required
                  value={password}
                />
              </div>

              <Button onChange={(e) => handleChange(e)} type='submit' value='Create account'>
                Create account
              </Button>
              {errorText && <AlertBox color={'red'}>{errorText}</AlertBox>}
            </div>
          </form>
          <div className='py-12 text-center'>
            <p className='text-gray-600 whitespace-nowrap'>
              Already have an account?{' '}
              <Link
                to='/sign-in'
                className='font-semibold text-gray-900 underline underline-offset-4'
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className='relative hidden h-screen bg-black pointer-events-none select-none md:block md:w-1/2'>
        <img
          className='absolute top-0 object-cover w-full h-full -z-1 '
          src='https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg'
        />
      </div>
    </div>
  )
}

export default SignUp
