import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {
  // set the initial state of the form
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields)

  const { displayName, email, password } = formFields

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
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
            <form className='mt-8'>
              <div className='relative mt-2 w-full'>
                <input
                  onChange={(e) => handleChange(e)}
                  name='displayName'
                  type='text'
                  required
                  placeholder='Name'
                  className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='email'
                  className='absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-secondary'
                >
                  {' '}
                  Enter Your Name{' '}
                </label>
              </div>
              <div className='relative mt-2 w-full'>
                <input
                  onChange={(e) => handleChange(e)}
                  type='email'
                  name='email'
                  required
                  placeholder='Email'
                  className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0'
                />
                <label
                  htmlFor='email'
                  className='absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-secondary'
                >
                  {' '}
                  Enter Your Email{' '}
                </label>
              </div>
              <div className='relative mt-2 w-full'>
                <input
                  onChange={(e) => handleChange(e)}
                  type='text'
                  name='password'
                  className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-secondary focus:outline-none focus:ring-0'
                  required
                  placeholder='Password'
                />
                <label
                  htmlFor='password'
                  className='absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-secondary'
                >
                  {' '}
                  Enter Your Password
                </label>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                className='mt-4 w-full cursor-pointer rounded-lg bg-secondary pt-3 pb-3 text-white shadow-lg hover:bg-blue-400'
                type='submit'
                value='Create account'
              />
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
