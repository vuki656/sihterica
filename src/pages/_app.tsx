import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const App = (props: AppProps) => {
    const {
        Component,
        pageProps,
    } = props

    return (
        <>
            <Head>
                <title>
                    Sihterica
                </title>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            <MantineProvider
                theme={{
                    colorScheme: 'light',
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    )
}

export default App
