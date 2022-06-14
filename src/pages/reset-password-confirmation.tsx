import type { NextPage } from 'next'
import Head from 'next/head'
import SimpleHeader from '../components/SimpleHeader'
import { useRouter } from "next/router";
import { useConfirmResetPasswordMutation } from '../generated/graphql';
import FormError from '../components/FormError';
import { useEffect, useState } from 'react';
import useNotAuthOrRedirect from '../hooks/useNotAuthOrRedirect';

const ResetPasswordConfirmation: NextPage = () => {
    useNotAuthOrRedirect("/app");

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [, confirmResetPassword] = useConfirmResetPasswordMutation();

    useEffect(() => {
        if (!router.isReady) return;
        sendTokenAndSetError();
    }, [router.isReady]);

    async function sendTokenAndSetError() {
        const { token } = router.query;

        if (typeof token !== "string" || token === "") {
            setError("Invalid token");
            return;
        }

        const response = await confirmResetPassword({ token })
        if (response.data?.confirmResetPassword.__typename === "FormErrors")
            setError(response.data.confirmResetPassword.errors[0].message);
    }

    return (
        <div>
            <Head>
                <title>Cloud - Reset Password Confirmation</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <SimpleHeader/>
                <div className="m-auto text-3xl">
                    {error && <FormError error={error}/>}
                </div>
            </main>
        </div>
    )
}

export default ResetPasswordConfirmation
