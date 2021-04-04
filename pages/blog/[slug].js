import { Bio } from "@components/Bio";
import CodeBlock from "@components/CodeBlock";
import { Image } from "@components/Image";
import { SEO } from "@components/Seo";
import { getAllPostIds, getPostData } from "@utils/posts";
import Link from "next/link";
import Date from '@components/date'
import ReactMarkdown from "react-markdown/with-html";

export default function Post({ frontmatter, excerpt, content }) {

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || excerpt}
        cover_image={frontmatter.cover_image}
      />

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-5xl font-black leading-none font-display">
            {frontmatter.title}
          </h1>

          <Link href="/" as="/">
            <a>&larr; Back to posts</a>
          </Link>

        </header>
        <Date dateString={frontmatter.date} />
        <ReactMarkdown
          className="mb-4 prose lg:prose-lg dark:prose-dark"
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock, image: MarkdownImage }}
        />
        <hr className="mt-4" />
        <footer className="flex flex-wrap content-center">
          <Bio className="mt-8 mb-16" />
        </footer>
      </article>

      {/* <nav className="flex flex-wrap justify-between mb-10">
        {previousPost ? (
          <Link href={"/post/[slug]"} as={`/post/${previousPost.slug}`}>
            <a className="text-lg font-bold">
              ← {previousPost.frontmatter.title}
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/post/[slug]"} as={`/post/${nextPost.slug}`}>
            <a className="text-lg font-bold">{nextPost.frontmatter.title} →</a>
          </Link>
        ) : (
          <div />
        )}
      </nav> */}
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { frontmatter, excerpt, content } = await getPostData(params.slug)

  return {
    props: {
      frontmatter,
      excerpt,
      content
    }
  }
}



const MarkdownImage = ({ alt, src }) => (
  <Image
    alt={alt}
    src={src}
    layout="responsive"
    className="w-full md:self-end"
  />
);
