import { ThemeProvider } from 'theme-ui'
import theme from '../theme'
import Prism from '@theme-ui/prism'
import '../styles/global.css'

const components = {
    pre: ({ children }) => <>{children}</>,
    code: Prism,
}


export default function App({ Component, pageProps }) {

    return (
        <ThemeProvider
            theme={theme}
            components={components}>
            <Component {...pageProps} />
        </ThemeProvider >
    )
}

