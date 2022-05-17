import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql'
import createUrqlClient from '../utils/createUrqlClient'
import { UploadProvider } from '../contexts/Upload';

const client = createClient(createUrqlClient());

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            <UploadProvider>
                <Component {...pageProps} />
            </UploadProvider>
        </Provider>
    )
}

export default MyApp
