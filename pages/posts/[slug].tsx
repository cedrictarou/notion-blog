import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
    <section className='container lg:px-2 px-5 lg:w-2/5 mx-auto mt-20'>
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
    </section>
  );
};

export default Post;
