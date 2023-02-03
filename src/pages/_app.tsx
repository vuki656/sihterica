import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import 'dayjs/locale/hr'
import { setDefaultOptions } from 'date-fns'
import { hr } from 'date-fns/locale'

const App = (props: AppProps) => {
    const {
        Component,
        pageProps,
    } = props

    useEffect(() => {
        setDefaultOptions({ locale: hr })
    }, [])

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
                    globalStyles: (theme) => ({
                        body: {
                            backgroundColor: theme.colors.gray[0],
                        },
                    }),
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
