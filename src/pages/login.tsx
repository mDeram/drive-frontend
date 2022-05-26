import type { NextPage } from 'next'
import Head from 'next/head'
import NotAuthOrRedirect from '../components/NotAuthOrRedirect';
import LoginForm from '../components/LoginForm';

const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Cloud - Login</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <NotAuthOrRedirect path="/app">
                    <LoginForm/>
                </NotAuthOrRedirect>
            </main>
        </div>
    )
}

export default Login;
