import type { NextPage } from 'next'
import Head from 'next/head'
import ContactForm from '../components/ContactForm';

const Contact: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Cloud - Contact</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <ContactForm/>
            </main>
        </div>
    )
}

export default Contact;
