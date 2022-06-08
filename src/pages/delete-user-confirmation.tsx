import type { NextPage } from 'next'
import Head from 'next/head'
import SimpleHeader from '../components/SimpleHeader'
import { useRouter } from "next/router";
import { useConfirmDeleteUserMutation } from '../generated/graphql';
import FormError from '../components/FormError';
import { useEffect, useState } from 'react';

const DeleteUserConfirmation: NextPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
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
            setSuccess(true);
    }

    return (
        <div>
            <Head>
                <title>Cloud - Delete Account Confirmation</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <SimpleHeader/>
                <div className="m-auto text-3xl">
                    {success
                        ? <span className="text-green-400 flex items-center mt-2">Your account has been deleted</span>
                        : error && <FormError error={error}/>
                    }
                </div>
            </main>
        </div>
    )
}

export default DeleteUserConfirmation
