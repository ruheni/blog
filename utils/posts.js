import matter from "gray-matter";
import fs from "fs";
import path from 'path';
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content');

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}


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
  const { data, excerpt, content } = matter(fileContents);

  const frontmatter = { ...data }
  //combine the data with the id and html content
  return {
    slug,
    frontmatter,
    excerpt,
    content
  };
}
