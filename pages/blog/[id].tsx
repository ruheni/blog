import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'

export const BlogPost = ({ postData }) => {
    return (
        <>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <Layout title={postData.title}>
                <h1>{postData.title}</h1>
                <Date dateString={postData.date} />
                <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
                <div>
                    <Link href="/blog" as="/blog">
                        <a>&larr; Back to blog</a>
                    </Link>
                </div>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // return a list of possible value for id
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // fetch necessary data fro the blob post using params.id
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}


export default BlogPost;
