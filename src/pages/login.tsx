import type { NextPage } from 'next'
import Head from 'next/head'
import LoginForm from '../components/LoginForm';

const Login: NextPage = () => {
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
