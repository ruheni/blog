const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Alex Ruheni',
    site_url: 'https://ruheni.dev',
    feed_url: 'https://ruheni.dev/feed.xml'
  });

  const posts = await fs.readdir(path.join(__dirname, '..', 'content'));

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'content', name)
      );
      const frontmatter = matter(content);

      feed.item({
        title: frontmatter.data.title,
        url: 'https://ruheni.dev/blog/' + name.replace(/\.md?/, ''),
        date: frontmatter.data.date,
        description: frontmatter.data.description
      });
    })
  );

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();