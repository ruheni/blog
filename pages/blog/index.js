import Link from 'next/link'
import React from 'react'
import Layout from '../../components/layout'
import { getSortedPostsData } from '../../lib/posts'
import Date from '../../components/date'

export default function Blog({ allPostsData }) {
    return (
        <Layout title="📝 Blog | I write as well">
            <h1>Blog</h1>
            <ul>
                {allPostsData.map(({ id, date, title }) => (
                    <li key={id}>
                        <Link href="/blog/[id]" as={`/blog/${id}`}>
                            <a>
                                {title}
                            </a>
                        </Link>
                        <Date dateString={date} />
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()

    return {
        props: {
            allPostsData
        }
    }
}
