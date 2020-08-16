import Link from 'next/link'
import { getAllPostIds, getPostData } from '../../utils/posts'
import Date from '../../components/Date'
import Layout from '../../components/Layout'


export default function BlogPost({ title, description, date, htmlContent, cover_image, siteTitle, siteDescription }) {

    if (!title) return <></>
    return (
        <>
            <Layout
                pageTitle={`${siteTitle} | ${title}`}
                pageDescription={`${siteDescription} | ${description}`}
                previewImage={cover_image}
            >
                <Link href="/" as="/">
                    <a>&larr; Back to posts</a>
                </Link>
                <article>
                    <h1>{title}</h1>
                    <Date dateString={date} />
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </article>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    // return a list of possible value for id
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const config = await import(`../../siteconfig.json`)

    // fetch necessary data from the blob post using params.slug
    const { title, date, description, htmlContent, cover_image } = await getPostData(params.slug)

    return {
        props: {
            siteTitle: config.title,
            siteDescription: config.description,
            title,
            date,
            description,
            htmlContent,
            cover_image
        }
    }
}
