import '../styles/global.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

export const siteTitle = 'Ruheni Alex'
export default function App({ Component, pageProps }: AppProps) {
    const title = pageProps.data?.title
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
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600&display=swap" rel="stylesheet"></link>
                <title>{title || 'Ruheni Alex | JavaScript Developer'}</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

