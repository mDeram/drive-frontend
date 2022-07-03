import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { useConfirmResetPasswordMutation } from '../generated/graphql';
import { useEffect, useState } from 'react';
import useNotAuthOrRedirect from '../hooks/useNotAuthOrRedirect';
import ConfirmationPage from '../components/ConfirmationPage';

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
        <ConfirmationPage title="Reset Password Confirmation" error={error}/>
    )
}

export default ResetPasswordConfirmation
