type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  onClick,
  className = 'mt-4 w-full cursor-pointer rounded-lg bg-secondary pt-3 pb-3 text-white shadow-lg hover:bg-blue-400',
  ...otherProps
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
