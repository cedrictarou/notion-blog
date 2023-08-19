import Head from "next/head";
import {
  getAllTags,
  getNumberOfPages,
  getPostsForPagination,
} from "@/lib/notionAPI";
import SinglePost from "@/components/post/SinglePost";
import Pagination from "@/components/pagination/Pagination";
import Tag from "@/components/tag/Tag";

export const getStaticPaths = async () => {
  const numberOfPages = await getNumberOfPages();
  const paths = Array.from({ length: numberOfPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: { params: { page: string } }) => {
  const currentPage = parseInt(context.params?.page);

  const posts = await getPostsForPagination(currentPage);

  const numberOfPage = await getNumberOfPages();

  const allTags = await getAllTags();

  return {
    props: {
      posts,
      numberOfPage,
      allTags,
    },
    revalidate: 60,
  };
};

export default function Page({ posts, numberOfPage, allTags }) {
  return (
    <>
      <div className='container h-full w-full mx-auto'>
        <Head>
          <title>Tokimasa&apos;s Portfolio</title>
          <meta name='description' content='Notion-Blog' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='container w-full mt-16'>
          <div className=''>
            <h2 className='text-5xl font-medium text-center mb-5'>記事一覧</h2>
            <Tag tags={allTags} />
          </div>
          <section className='text-gray-600 body-font'>
            <div className='container px-5 py-10 mx-auto'>
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
          <Pagination numberOfPage={numberOfPage} tag={""} />
        </main>
      </div>
    </>
  );
}
