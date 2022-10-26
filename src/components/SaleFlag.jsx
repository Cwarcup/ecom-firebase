// save for later

const SaleFlag = ({ children }) => {
  return (
    <div className='relative'>
      <div className='absolute top-0 m-1 rounded-full bg-white'>
        <p className='text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1'>
          {children}
        </p>
      </div>
    </div>
  )
}

export default SaleFlag
