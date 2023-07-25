export const getPageLink = (tag: string, page: number) => {
	return tag ? `/posts/tags/${tag}/page/${page}` : `/posts/page/${page}`;
}