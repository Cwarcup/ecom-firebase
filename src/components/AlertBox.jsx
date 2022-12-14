import { useState } from 'react'

const AlertBox = ({ children, color }) => {
  // hide the alert when the user clicks the close button
  const [showAlert, setShowAlert] = useState(true)

  const handleClose = () => {
    setShowAlert(false)
  }

  return (
    <div
      className={`bg-${color}-100 rounded relative border border-${color}-400 text-${color}-700 px-4 py-3 mt-4
      ${showAlert ? 'block' : 'hidden'}`}
      role='alert'
    >
      <strong className='font-bold'>Uh oh! </strong>
      <span className='block sm:inline'>{children}</span>
      <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
        <svg
          className={`fill-current h-6 w-6 text-${color}-500`}
          role='button'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          onClick={handleClose}
        >
          <title>Close</title>
          <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
        </svg>
      </span>
    </div>
  )
}

export default AlertBox
