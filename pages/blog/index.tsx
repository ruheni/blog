import Link from 'next/link'
import React from 'react'
import Layout from '../../components/layout'
import { getSortedPostsData } from '../../lib/posts'
import Date from '../../components/date'
import { GetStaticProps } from 'next'

export default function Blog({ allPostsData }) {
    return (
        <Layout
            title="Blog"
            description="This is where I share my thoughts, experience and occasionally rant"
        >
            <h1>Blog</h1>
            <ul>
                {allPostsData.map(({ id, date, title }) => (
                    <li key={id}>
                        <Link href="/blog/[id]" as={`/blog/${id}`}>
                            <a>
                                {title}
                            </a>
                        </Link>
                        <br />
                        <Date dateString={date} />
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()

    return {
        props: {
            allPostsData
        }
    }
}
