import type { NextPage } from 'next'
import Head from 'next/head'
import useNotAuthOrRedirect from '../hooks/useNotAuthOrRedirect';
import RegisterForm from "../components/RegisterForm";

const Register: NextPage = () => {
    useNotAuthOrRedirect("/app");

    return (
        <div>
            <Head>
                <title>Cloud - Register</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <RegisterForm/>
            </main>
        </div>
    )
}

export default Register;
