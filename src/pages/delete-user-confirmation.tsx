import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { useConfirmDeleteUserMutation } from '../generated/graphql';
import { useEffect, useState } from 'react';
import ConfirmationPage from '../components/ConfirmationPage';

const DeleteUserConfirmation: NextPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [, confirmDeleteUser] = useConfirmDeleteUserMutation();

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

        const response = await confirmDeleteUser({ token })
        if (response.data?.confirmDeleteUser.__typename === "FormErrors")
            setError(response.data.confirmDeleteUser.errors[0].message);
        else if (response.data?.confirmDeleteUser.response)
            setSuccess("Your account has been deleted");
    }

    return (
        <ConfirmationPage title="Delete Account Confirmation" success={success} error={error}/>
    )
}

export default DeleteUserConfirmation
