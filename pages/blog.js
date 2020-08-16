import Link from 'next/link'
import React from 'react'
import Date from '../components/date'
import Layout from '../components/layout'

export default function Blog({ allPostsData }) {
    return (
        <Layout
            pageTitle="Blog"
            pageDescription="This is where I share my thoughts, experience and occasionally rant"
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

export const getStaticProps = async () => {
    const allPostsData = []

    return {
        props: {
            allPostsData
        }
    }
}
