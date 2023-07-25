import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md";

// Initializing a client
const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});


const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
	const posts = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID!,
		page_size: 100,
		filter: {
			property: "published",
			checkbox: {
				equals: true
			},
		},
		sorts: [
			{
				property: "date",
				direction: "descending"
			}
		]
	});

	const allPosts = posts.results

	return allPosts.map((post) => {
		return getPageMetaData(post);
	});
}

const getPageMetaData = (post: any) => {

	const getTags = (tags: any[]) => {
		const allTags = tags.map((tag) => tag.name)
		return allTags
	}

	return {
		id: post.id,
		title: post.properties.name.title[0].plain_text,
		description: post.properties.description.rich_text[0].plain_text,
		date: post.properties.date.last_edited_time,
		slug: post.properties.slug.rich_text[0].plain_text,
		tags: getTags(post.properties.tags.multi_select),
	}
}

export const getSinglePost = async (slug: string) => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID!,
		filter: {
			property: "slug",
			formula: {
				string: {
					equals: slug,
				}
			}
		}
	});
	const page = response.results[0];
	const metadata = getPageMetaData(page);
	const mdBlocks = await n2m.pageToMarkdown(page.id);
	const mdString = n2m.toMarkdownString(mdBlocks);

	return {
		metadata,
		markdown: mdString,
	}
}

export const getPostsForTopPage = async (pageSize = 4) => {
	const allPosts = await getAllPosts();
	const postsForTopPage = allPosts.slice(0, pageSize);
	return postsForTopPage;
}

export const getPostsForPagination = async (page: number) => {
	const allPosts = await getAllPosts();

	const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
	const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

	return allPosts.slice(startIndex, endIndex);
}

export const getNumberOfPages = async (pageSize = 4) => {
	const allPosts = await getAllPosts();
	return Math.ceil(allPosts.length / pageSize);
}

export const getPostsByTag = async (tagName: string, page: number) => {
	const allPosts = await getAllPosts();
	const postsByTag = allPosts.filter((post) => post.tags.find((t: string) => t === tagName));


	// pagenationに対応
	const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
	const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

	return postsByTag.slice(startIndex, endIndex);
}

export const getNumberOfPagesByTag = async (tagName: string, pageSize = 4) => {
	const allPosts = await getAllPosts();
	const postsByTag = allPosts.filter((post) => post.tags.find((t: string) => t === tagName));
	return Math.ceil(postsByTag.length / pageSize);
}

export const getAllTags = async () => {
	const allPosts = await getAllPosts();
	const allTags = allPosts.map((post) => post.tags).flat();
	const set = new Set(allTags);
	const uniqueTags = Array.from(set);
	return uniqueTags;
}
