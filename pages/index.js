import Head from "next/head";
import { getPostsForTopPage, getAllTags } from "@/lib/notionAPI";
import SinglePost from "@/components/post/SinglePost";
import Tag from "@/components/tag/Tag";

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
  return (
    <div className='container h-full w-full mx-auto'>
      <Head>
        <title>Notion-Blog</title>
        <meta name='description' content='Notion-Blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>Notion-Blog</h1>
        <section>
          <article>
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
          </article>
        </section>
      </main>
      <Tag tags={allTags} />
    </div>
  );
}
