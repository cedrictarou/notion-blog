import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTwitter,
  faFacebookF,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const icons = [
    { href: "https://twitter.com/", brand: faTwitter },
    { href: "https://www.facebook.com/", brand: faFacebookF },
    { href: "https://www.github.com/", brand: faGithub },
  ];

  return (
    <footer className='text-gray-600 body-font'>
      <div className='bg-gray-200'>
        <div className='container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col'>
          <Link
            href='/'
            className='flex title-font font-medium items-center md:justify-start justify-center text-gray-900'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span className='ml-3 text-xl'>Tokimasa&apos;s Blog</span>
          </Link>

          <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start gap-x-3'>
            {icons.map((icon, index) => (
              <Link
                href={icon.href}
                target='_blank'
                key={index}
                className='text-gray-500 hover:text-indigo-500 duration-300 transition'
              >
                <FontAwesomeIcon icon={icon.brand} size='lg' />
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
