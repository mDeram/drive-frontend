import Head from 'next/head'
import SimpleHeader from '../components/SimpleHeader'
import FormError from '../components/FormError';
import FormSuccess from '../components/FormSuccess';

interface ConfirmationPageProps {
    title: string;
    error: string | null;
    success?: string | null;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
    title,
    error,
    success
}) => {
    return (
        <div>
            <Head>
                <title>Drive - {title}</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <SimpleHeader/>
                <div className="m-auto text-2xl sm:text-3xl">
                    <FormSuccess success={success}/>
                    <FormError error={error}/>
                </div>
            </main>
        </div>
    );
}

export default ConfirmationPage;
