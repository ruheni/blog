import Link from 'next/link'
import Date from './Date'

export default function PostList({ posts }) {
    if (posts === 'undefined') return null

    return (
        <div>
            {!posts && <div>No posts!</div>}
            <ul>
                {posts.map(({ slug, date, title }) => (
                    <li key={slug}>
                        <Link href="/post/[slug]" as={`/post/${slug}`}>
                            <a>
                                {title}
                            </a>
                        </Link>
                        <br />
                        <Date dateString={date} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
