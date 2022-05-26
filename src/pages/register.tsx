import type { NextPage } from 'next'
import Head from 'next/head'
import NotAuthOrRedirect from '../components/NotAuthOrRedirect';
import RegisterForm from "../components/RegisterForm";

const Register: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Cloud - Register</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <NotAuthOrRedirect path="/app">
                    <RegisterForm/>
                </NotAuthOrRedirect>
            </main>
        </div>
    )
}

export default Register;
