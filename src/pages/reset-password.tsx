import type { NextPage } from 'next'
import Head from 'next/head'
import useNotAuthOrRedirect from '../hooks/useNotAuthOrRedirect';
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword: NextPage = () => {
    useNotAuthOrRedirect("/app");

    return (
        <div>
            <Head>
                <title>Drive - Reset Password</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <ResetPasswordForm/>
            </main>
        </div>
    )
}

export default ResetPassword;
