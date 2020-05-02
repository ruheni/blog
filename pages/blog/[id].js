import React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'

export default function BlogPost({ postData }) {
    return (
        <Layout title={postData.title}>
            <h1>{postData.title}</h1>
            <Date dateString={postData.date} />
            <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} allowdangeroushtml="true" />
            <div>
                <Link href="/blog" as="/blog">
                    <a>&larr; Back to blog</a>
                </Link>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    // return a list of possible value for id
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // fetch necessary data fro the blob post using params.id
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
