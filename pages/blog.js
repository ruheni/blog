import Head from 'next/head'
import React from 'react'
import { getSortedPostsData } from '../lib/posts'

export default function Blog({ allPostsData }) {
    return (
        <>
            <Head>
                <title>Blog | I write as well</title>
            </Head>
            <h1>Hello worldd</h1>
            <ul>
                {allPostsData.map(({ id, date, title }) => (
                    <li key={id}>
                        {title}
                        <br />
                        {date}
                        <br />
                        <code>{id}</code>
                    </li>
                ))}

            </ul>
        </>
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
