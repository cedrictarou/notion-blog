import Head from "next/head";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTag,
} from "@/lib/notionAPI";
import SinglePost from "@/components/post/SinglePost";
import Pagination from "@/components/pagination/Pagination";
import { Key } from "react";
import Tag from "@/components/tag/Tag";

type Post = {
  id: Key;
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
};

export const getStaticPaths = async () => {
  const allTags = await getAllTags();
  const paths = [];

  for (const tag of allTags) {
    const numberOfPagesByTag = await getNumberOfPagesByTag(tag);
    const pageNumbers = Array.from({ length: numberOfPagesByTag }, (_, i) =>
      (i + 1).toString()
    );
    const tagPaths = pageNumbers.map((page) => ({
      params: { tag, page },
    }));
    paths.push(...tagPaths);
  }
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: {
  params: { page: string; tag: string };
}) => {
  const currentPage = parseInt(context.params?.page);
  const currentTag = context.params?.tag.toString();
  const posts = await getPostsByTag(currentTag, currentPage);
  const numberOfPages = await getNumberOfPagesByTag(currentTag);
  const allTags = await getAllTags();

  return {
    props: {
      posts,
      numberOfPages,
      tag: currentTag,
      allTags,
    },
    revalidate: 60,
  };
};

export default function TagPage({ posts, numberOfPages, tag, allTags }) {
  return (
    <div className='container h-full w-full mx-auto'>
      <Head>
        <title>Notion-Blog</title>
        <meta name='description' content='Notion-Blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container w-full mt-16'>
        <h2 className='text-5xl font-medium text-center mb-5'>検索結果</h2>
        <section className='text-gray-600 body-font'>
          <div className='container px-5 py-10 mx-auto'>
            <div className='flex flex-wrap -m-4'>
              {posts.map((post: Post) => (
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
        <Pagination numberOfPage={numberOfPages} tag={tag} />
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
