import Head from 'next/head'

const name = 'Ruheni Alex'
export const siteTitle = 'Ruheni Alex'

export default function Layout({ children, title }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon" />
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="description" content="Ruheni Alex | Personal site/blog" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <title>{title}</title>
            </Head>
            <main>{children}</main>
        </>

    )
}
