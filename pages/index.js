import Layout from '../components/Layout'
import PostList from '../components/PostList'
import { getSortedPostsData } from '@utils/posts'

const Index = ({ posts, title, ...props }) => {
    let description = 'Hello there internet stranger👋🏾.\n My name is Alex Ruheni and I am a Software Engineer.\n This is my digital garden - where I share my thoughts, learning experience and occassional rants.'
    return (
        <Layout
            pageTitle={title}
            pageDescription={description}>
            <h1 className="title">Welcome to my blog 🚀</h1>
            <p>{description}</p>
            <main>
                <PostList posts={posts} />
            </main>
        </Layout>
    )
}

export default Index

export async function getStaticProps() {
    const configData = await import(`../siteconfig.json`)

    const posts = getSortedPostsData()

    return {
        props: {
            posts,
            title: configData.default.title,
        }
    }
}
