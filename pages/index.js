import Head from "next/head";
import { getPostsForTopPage, getAllTags } from "@/lib/notionAPI";
import SinglePost from "@/components/post/SinglePost";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVuejs,
  faReact,
  faLaravel,
} from "@fortawesome/free-brands-svg-icons";
import { faTrainSubway, faStar } from "@fortawesome/free-solid-svg-icons";

export const getStaticProps = async () => {
  const posts = await getPostsForTopPage();
  const allTags = await getAllTags();

  return {
    props: {
      posts,
      allTags,
    },
    revalidate: 60,
  };
};

export default function Home({ posts, allTags }) {
  const skills = [
    {
      name: "Vue.js",
      icon: faVuejs,
      rate: 4,
    },
    {
      name: "React.js",
      icon: faReact,
      rate: 3,
    },
    {
      name: "Laravel",
      icon: faLaravel,
      rate: 3,
    },
    {
      name: "Ruby on Rails",
      icon: faTrainSubway,
      rate: 3,
    },
  ];

  const starDescriptions = [
    { rate: 5, description: "実務経験があり特に熟知している" },
    { rate: 4, description: "実務経験あり" },
    { rate: 3, description: "実務経験はあるが使用期間が短い" },
    { rate: 2, description: "個人開発の経験あり" },
    { rate: 1, description: "基本的な学習を終えた" },
  ];
  return (
    <div className='container h-full w-full mx-auto'>
      <Head>
        <title>Tokimasa&apos;s Blog</title>
        <meta name='description' content="Tokimasa's blog" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container w-full px-5'>
        {/* hero area */}
        <section className='text-gray-600 body-font'>
          <div className='relative h-[600px] w-full mb-20'>
            <Image
              alt='eye-catch-image'
              src='/images/eye-catch-image.jpg'
              layout={"fill"}
              objectFit={"cover"}
              loading='lazy'
            />
            <div className='absolute inset-0 bg-black opacity-30 backdrop-blur-2xl'></div>
            {/* この行でオーバーレイを追加 */}
            <div className='absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='text-center w-full text-white'>
                <h2 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-white uppercase'>
                  Tokimasa&apos;s Blog
                </h2>
                <p className='mb-8 leading-relaxed text-lg'>
                  ユーザーとお客様が心から満足できるアプリを開発致します
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* works area */}
        <section id='works' className='text-gray-600 body-font'>
          <div className='container py-24 mx-auto px-5'>
            <h2 className='sm:text-3xl text-2xl text-center mb-4 font-medium title-font text-gray-900 uppercase'>
              works
            </h2>
            <div className='flex flex-wrap -m-4'>
              {posts.map((post) => (
                <SinglePost
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* skill area */}
        <section className='text-gray-600 body-font' id='skills'>
          <div className='container py-24 mx-auto px-5'>
            <div className='flex flex-col w-full mb-20'>
              <h2 className='sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900 uppercase'>
                skills
              </h2>
              <div className='mx-auto leading-relaxed'>
                {starDescriptions.map((item, index) => (
                  <div key={index} className='flex items-center flex-wrap'>
                    <span>
                      <FontAwesomeIcon
                        icon={faStar}
                        className='mr text-yellow-400'
                      />
                      x{item.rate}:
                    </span>
                    <span className='ml-2 md:text-base text-sm'>
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-wrap sm:justify-between justify-center'>
              {skills.map((skill, index) => {
                return (
                  <div
                    className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                    key={index}
                  >
                    <div className='h-full flex items-center p-4'>
                      <Image
                        alt='team'
                        className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
                        src='https://dummyimage.com/80x80'
                        width={80}
                        height={80}
                      />
                      <div>
                        <h3 className='text-gray-900 title-font font-medium'>
                          {skill.name}
                        </h3>
                        <p className='text-gray-500'>
                          {[...Array(skill.rate)].map((e, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className='mr-2 text-yellow-400'
                            />
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* about area */}
        <section className='text-gray-600 body-font' id='about'>
          <div className='container mx-auto flex py-24 md:flex-row flex-col items-center px-5'>
            <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0'>
              <Image
                className='object-cover object-center rounded'
                alt='hero'
                src='https://dummyimage.com/720x600'
                width={720}
                height={600}
              />
            </div>
            <div className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
              <h2 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 uppercase'>
                about me
              </h2>
              <p className='mb-8 leading-relaxed'>
                webアプリ開発エンジニア。
                <br /> 2020年ごろより独学で学習開始。2023年1月よりCoach
                Techに入会。現在はフリーランスエンジニアとして活動しております。
                <br />
                フロントエンド・バックエンドを開発。主な使用言語はJavaScript・PHPであり、フレームワークはVue.js/Nuxt.js・React.js/Next.js・Laravelをメインに使っています。Ruby
                on Railsも少し触ったことがあります。
                <br />
                お仕事を任せて頂いたことに感謝し、誠実で責任のある対応を心掛けています。
              </p>
              <div className='flex justify-center'>
                <button className='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
                  Button
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* contact area */}
        <section className='text-gray-600 body-font relative' id='contact'>
          <div className='container py-24 mx-auto px-5'>
            <div className='flex flex-col text-center w-full mb-12'>
              <h2 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 uppercase'>
                contact me
              </h2>
              <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify.
              </p>
            </div>
            <div className='lg:w-1/2 md:w-2/3 mx-auto'>
              <div className='flex flex-wrap -m-2'>
                <div className='p-2 w-1/2'>
                  <div className='relative'>
                    <label
                      htmlFor='name'
                      className='leading-7 text-sm text-gray-600'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                  </div>
                </div>
                <div className='p-2 w-1/2'>
                  <div className='relative'>
                    <label
                      htmlFor='email'
                      className='leading-7 text-sm text-gray-600'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                  </div>
                </div>
                <div className='p-2 w-full'>
                  <div className='relative'>
                    <label
                      htmlFor='message'
                      className='leading-7 text-sm text-gray-600'
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className='p-2 w-full'>
                  <button className='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
                    Button
                  </button>
                </div>
                <div className='p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center'>
                  <a className='text-indigo-500'>example@email.com</a>
                  <span className='inline-flex'>
                    <a className='text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'
                      >
                        <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
                      </svg>
                    </a>
                    <a className='ml-4 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'
                      >
                        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
                      </svg>
                    </a>
                    <a className='ml-4 text-gray-500'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'
                      >
                        <rect
                          width={20}
                          height={20}
                          x={2}
                          y={2}
                          rx={5}
                          ry={5}
                        />
                        <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01' />
                      </svg>
                    </a>
                    <a className='ml-4 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-5 h-5'
                        viewBox='0 0 24 24'
                      >
                        <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
