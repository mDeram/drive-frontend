import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql'
import createUrqlClient from '../utils/createUrqlClient'
import { NotificationProvider, PushNotificationDefault, useNotificationContext } from '../contexts/Notification';
import { useEffect } from 'react';

export interface Ctx {
    initialized: boolean;
    pushNotificationDefault: null | PushNotificationDefault;
}

const ctx: Ctx = { initialized: false, pushNotificationDefault: null };
const client = createClient(createUrqlClient(ctx));

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NotificationProvider>
            <UrqlProvider>
                <Component {...pageProps} />
            </UrqlProvider>
        </NotificationProvider>
    )
}

const UrqlProvider: React.FC = ({ children }) => {
    const { pushNotificationDefault } = useNotificationContext()!;
    useEffect(() => {
        ctx.pushNotificationDefault = pushNotificationDefault;
        ctx.initialized = true;
    }, [pushNotificationDefault]);

    return (
        <Provider value={client}>
            {children}
        </Provider>
    );
}

export default MyApp
