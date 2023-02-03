import { createGetInitialProps } from '@mantine/next'
import Document, {
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
    public static getInitialProps = getInitialProps

    public render() {
        return (
            <Html>
                <Head>
                    <meta
                        content="noindex"
                        name="robots"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
