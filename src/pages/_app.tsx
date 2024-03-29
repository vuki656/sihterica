import { MantineProvider } from '@mantine/core'
import { setDefaultOptions } from 'date-fns'
import { hr } from 'date-fns/locale'
import type { AppProps } from 'next/app'
import 'dayjs/locale/hr'
import Head from 'next/head'

import { GlobalStyles } from '@/Components'

import dayjs from 'dayjs'

setDefaultOptions({ locale: hr })

dayjs.locale('hr')

const App = (props: AppProps) => {
    const {
        Component,
        pageProps,
    } = props

    return (
        <>
            <Head>
                <title>
                    eSihterica
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
                <GlobalStyles />
                <Component {...pageProps} />
            </MantineProvider>
        </>
    )
}

export default App
