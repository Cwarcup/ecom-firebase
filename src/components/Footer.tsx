import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

type SVGPropsType = React.SVGProps<SVGSVGElement>

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Womens', href: '/shop/womens' },
    { name: 'Mens', href: '/shop/mens' },
    { name: 'Hats', href: '/shop/hats' },
    { name: 'Jackets', href: '/shop/jackets' },
    { name: 'Sneakers', href: '/shop/sneakers' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/Cwarcup',
      icon: (props: SVGPropsType) => <AiFillGithub {...props} />,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/curtiswarcup/',
      icon: (props: SVGPropsType) => <AiFillLinkedin {...props} />,
    },
  ],
}

export default function Footer() {
  return (
    <footer className='bg-white'>
      <div className='px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8'>
        <nav className='flex flex-wrap justify-center -mx-5 -my-2' aria-label='Footer'>
          {navigation.main.map((item) => (
            <div key={item.name} className='px-5 py-2'>
              <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className='flex justify-center mt-8 space-x-6'>
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className='text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>{item.name}</span>
              <item.icon className='w-6 h-6' aria-hidden='true' />
            </a>
          ))}
        </div>
        <p className='mt-8 text-base text-center text-gray-400'>
          &copy; 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
