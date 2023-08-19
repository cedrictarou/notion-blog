import Link from "next/link";
import React from "react";

const links = [
  { href: "/#works", label: "works" },
  { href: "/#skills", label: "skills" },
  { href: "/#about", label: "about" },
  { href: "/#contact", label: "contact" },
];

const Navbar = () => {
  return (
    <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
      <div className='container flex items-center justify-between mx-auto'>
        <ul className='flex items-center text-sm py-4 gap-x-3'>
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className='block hover:text-indigo-500 transition duration-300'
                aria-label={link.label}
              >
                {link.label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
