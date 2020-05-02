import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

// interface Post {
// 	date: string;
// 	title: string;
// 	description: string;
// 	tags: string[];
// 	published: boolean;
// }

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData: any[] = fileNames.map((fileName) => {
		// remove .md from file name
		const id = fileName.replace(/\.md$/, '');

		// read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		const matterResult = matter(fileContents);

		// combine data with id
		return {
			id,
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
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
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
		id,
		htmlContent,
		...matterResult.data,
	};
}
