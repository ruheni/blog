import Link from "next/link";
import { SEO } from "@components/Seo";
import { Bio } from "@components/Bio";
import { getSortedPostsData } from "@utils/posts";

export default function Home({ posts }) {
  return (
    <>
      <SEO title="All posts" />
      <Bio className="my-14" />
      {posts.map(({ title, description, date, slug }) => (
        <article key={slug}>
          <header className="mb-2">
            <h3 className="mb-2">
              <Link href={"/blog/[slug]"} as={`/blog/${slug}`}>
                <a className="text-4xl font-bold text-yellow-600 font-display">
                  {title}
                </a>
              </Link>
            </h3>
            <span className="text-sm">{date}</span>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
        </article>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();

  return {
    props: {
      posts,
    },
  };
}
