import { signInWithGooglePopup } from '../utils/firebase/firebaseUtils'

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    console.log(response)
  }

  return (
    <div className='flex flex-wrap'>
      <div className='flex w-full flex-col md:w-1/2'>
        <div className='lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0'>
          <p className='text-left text-3xl font-bold'>Welcome back</p>
          <p className='mt-2 text-left text-gray-500'>Welcome back, please enter your details.</p>
          <button
            className='-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-secondary ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-info bg-neutral text-primary hover:text-base-100'
            onClick={logGoogleUser}
          >
            <img className='mr-2 h-5' src='https://static.cdnlogo.com/logos/g/35/google-icon.svg' />{' '}
            Log in with Google
          </button>
        </div>
      </div>
      <div className='pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2'>
        <div className='absolute bottom-0 z-10 px-8 text-base-100 opacity-100'>
          <p className='mb-8 text-3xl font-semibold leading-10'>
            We work 10x faster than our compeititors and stay consistant. While they&apos;re bogged
            won with techincal debt, we&apos;re realeasing new features.
          </p>
          <p className='mb-4 text-3xl font-semibold'>John Elmond</p>
          <p className=''>Founder, Emogue</p>
          <p className='mb-7 text-sm opacity-70'>Web Design Agency</p>
        </div>
        <img
          className='-z-1 absolute top-0 h-full w-full object-cover opacity-90'
          src='https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        />
      </div>
    </div>
  )
}

export default SignIn
