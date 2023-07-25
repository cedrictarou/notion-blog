import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className='container mx-auto lg:px-2 px-5'>
        <div className='container flex items-center justify-between mx-auto'>
          <Link href='/' className='text-2xl font-medium'>
            Tokimasa Blog
          </Link>
          <div>
            <ul className='flex items-center text-sm py-4 gap-x-3'>
              <Link
                href='/'
                className='block hover:text-sky-500 transition duration-300'
              >
                twitter
              </Link>
              <Link
                href='/'
                className='block hover:text-sky-500 transition duration-300'
              >
                facebook
              </Link>
              <Link
                href='/'
                className='block hover:text-sky-500 transition duration-300'
              >
                github
              </Link>
              <Link
                href='/'
                className='block hover:text-sky-500 transition duration-300'
              >
                instagram
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
