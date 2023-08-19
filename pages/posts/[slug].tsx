import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { formatDate } from "@/lib/format-date";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

const Post = ({ post }) => {
  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='lg:w-4/6 mx-auto'>
            <div className='flex flex-col sm:flex-row mt-10'>
              <div className='mt-4 pt-4 sm:mt-0'>
                <h2 className='w-full text-2xl font-medium'>
                  {post.metadata.title}
                </h2>
                <div className='border-b-2 w-1/3 my-1 border-sky-900'></div>
                <div className='flex gap-x-2 justify-between'>
                  <div className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                    {post.metadata.tags.map((tag, i) => (
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
                  <div>更新日：{formatDate(post.metadata.date)}</div>
                </div>
                <div className='leading-loose'>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...props}
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag='div'
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code {...props} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {post.markdown.parent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className='container lg:px-2 px-5 lg:w-2/5 mx-auto mt-20'>
        <h2 className='w-full text-2xl font-medium'>{post.metadata.title}</h2>
        <div className='border-b-2 w-1/3 mt-1 border-sky-900'></div>
        <span className='text-gray-500'>{post.metadata.date}</span>
        <br />
        <div className='flex gap-x-2'>
          {post.metadata.tags.map((tag: string, i: number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={i}>
              <span
                className='text-white bg-gray-500 rounded-lg px-2 pb-1'
                key={i}
              >
                {tag}
              </span>
            </Link>
          ))}
        </div>

        <div className='mt-10 font-medium'>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag='div'
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.markdown.parent}
          </ReactMarkdown>
        </div>
      </section> */}
    </>
  );
};

export default Post;
