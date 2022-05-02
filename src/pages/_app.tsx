import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql'
import createUrqlClient from '../utils/createUrqlClient'

const client = createClient(createUrqlClient());

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
