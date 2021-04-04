import Head from "next/head";
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getSiteMetaData } from "@utils/helpers";

export function SEO({ title, description = "", cannonical_url = "", cover_image }) {
  const siteMetadata = getSiteMetaData();

  const metaDescription = description || siteMetadata.description;

  const router = useRouter()

  return (
    <Head>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta property="og:url" content={router.pathname} key="ogurl" />
      <meta property="og:image" content={cover_image} key="ogimage" />
      <meta property="og:site_name" content={siteMetadata.title} key="ogsitename" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      {cannonical_url !== "" ? <Link rel="canonical" href={cannonical_url}></Link> : null}
    </Head>
  );
}
