import Footer from "@components/Footer";
import Head from "next/head";


export default function Layout({ children, pageTitle, pageDescription, ...props }) {
    const twitterHandle = "https://twitter.com/ruheni_alex"
    let title = pageTitle
    let description = pageDescription
    let previewImage = props.previewImage || '/assets/avatar.svg'

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />

                <meta name="description" content={description} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary" key="twcard" />
                <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

                {/* Open Graph */}
                {/* <meta property="og:url" content={router.pathname} key="ogurl" /> */}
                <meta property="og:image" content={previewImage} key="ogimage" />
                <meta property="og:site_name" content="Ruheni Alex" key="ogsitename" />
                <meta property="og:title" content={title} key="ogtitle" />
                <meta property="og:description" content={description || ""} key="ogdesc" />

                <meta name="twitter:card" content="summary_large_image" />

                <title>{title}</title>

                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <main className="container">{children}</main>
            <Footer />
        </>
    )
}
