import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { useConfirmRegisterMutation } from '../generated/graphql';
import { useEffect, useState } from 'react';
import useNotAuthOrRedirect from '../hooks/useNotAuthOrRedirect';
import ConfirmationPage from '../components/ConfirmationPage';

const RegisterConfirmation: NextPage = () => {
    useNotAuthOrRedirect("/app");

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [, confirmRegister] = useConfirmRegisterMutation();

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

        const response = await confirmRegister({ token })
        if (response.data?.confirmRegister.__typename === "FormErrors")
            setError(response.data.confirmRegister.errors[0].message);
    }

    return (
        <ConfirmationPage title="Register Confirmation" error={error}/>
    )
}

export default RegisterConfirmation
