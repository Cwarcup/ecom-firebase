import { FC, ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  className: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({
  children,
  className = 'mt-4 w-full cursor-pointer rounded-lg bg-secondary pt-3 pb-3 text-white shadow-lg hover:bg-blue-400',
  ...otherProps
}: ButtonProps) => {
  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
