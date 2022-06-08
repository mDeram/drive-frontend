import type { NextPage } from 'next'
import Head from 'next/head'
import useNotAuthOrRedirect from '../hooks/useNotAuthOrRedirect';
import LoginForm from '../components/LoginForm';

const Login: NextPage = () => {
    useNotAuthOrRedirect("/app");

    return (
        <div>
            <Head>
                <title>Cloud - Login</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <LoginForm/>
            </main>
        </div>
    )
}

export default Login;
