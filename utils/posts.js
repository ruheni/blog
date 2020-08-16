import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// remove .md from file name
		const slug = fileName.replace(/\.md$/, '');

		// read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		const matterResult = matter(fileContents);

		// combine data with id
		return {
			slug,
			...matterResult.data,
		};
	});
	// sort posts by date
	return allPostsData
		.filter((post) => !!post.published)
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);
	// return an array of objects with file names as ids
	return fileNames.map((fileName) => {
		return {
			params: {
				slug: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getPostData(slug) {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// parse post metadata section with gray-matter
	const matterResult = matter(fileContents);

	//convert markdown into HTML string
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const htmlContent = processedContent.toString();

	//combine the data with the id and html content
	return {
		slug,
		htmlContent,
		...matterResult.data,
	};
}
