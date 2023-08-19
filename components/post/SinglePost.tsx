import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/lib/format-date";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug } = props;

  return (
    <>
      <article className='p-4 w-full md:w-1/2 lg:w-1/3'>
        <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
          <Image
            className='lg:h-48 md:h-36 w-full object-cover object-center'
            src='https://dummyimage.com/720x400'
            width={720}
            height={400}
            alt='blog'
          />
          <div className='p-6'>
            <div className='flex justify-between flex-wrap'>
              <div className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                {tags.map((tag, i) => (
                  <Link href={`/posts/tag/${tag}/page/1`} key={i}>
                    <span
                      className='inline-block py-1 px-2 mr-2 rounded bg-indigo-100 text-indigo-500 text-xs font-medium tracking-widest'
                      key={i}
                    >
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
              <div className='text-xs ml-auto'>{formatDate(date)}</div>
            </div>

            <h2 className='title-font text-lg font-medium text-gray-900 mb-3'>
              {title}
            </h2>
            <p className='leading-relaxed mb-3'>{description}</p>
            <div className='flex items-center flex-wrap justify-end'>
              <Link
                href={`/posts/${slug}`}
                className='text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0'
              >
                Read More
              </Link>
              <a className='text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0'>
                <svg
                  className='w-4 h-4 ml-2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M5 12h14'></path>
                  <path d='M12 5l7 7-7 7'></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default SinglePost;
