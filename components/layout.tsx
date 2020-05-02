import Head from 'next/head'

export const siteTitle = 'Ruheni Alex'

export default function Layout({ children, title }) {
    const date = new Date().getFullYear()
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon" />
                <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="description" content="Ruheni Alex | Personal site/blog" />
                <meta name="og:title" content={siteTitle} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:site_name" content="Ruheni Alex | Software Developer" />
                <meta name="twitter:card" content="summary_large_image" />
                <title>{title}</title>
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600&display=swap" rel="stylesheet"></link>
            </Head>
            <main className="container">{children}</main>
            <footer className="copyright">
                <p>
                    🏗  by {siteTitle}
                    <br />
                    &copy; {date}
                </p>
            </footer>
            {/* <script src="/prism.js"></script> */}
        </>
    )
}
