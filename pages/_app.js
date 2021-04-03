import { ThemeProvider } from "next-themes";
import Layout from '@components/Layout'
import "@assets/main.css";

import "typeface-open-sans";
import "typeface-ibm-plex-mono";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
