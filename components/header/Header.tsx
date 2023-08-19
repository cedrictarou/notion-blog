import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";

const Header = () => {
  return (
    <header className='text-gray-600 body-font sticky top-0 bg-white z-50'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link
          href='/'
          className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
            viewBox='0 0 24 24'
          >
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
          </svg>
          <h1 className='ml-3 text-2xl font-medium'>Tokimasa&apos;s Blog</h1>
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
