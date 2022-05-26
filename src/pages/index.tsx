import type { NextPage } from 'next'
import Head from 'next/head'
import SimpleHeader from '../components/SimpleHeader'

const SignUpButton: React.FC = () => {
    return (
        <a href="/register" className="btn text-white bg-accent-600 hover:bg-accent-700 font-bold px-5">Sign up</a>
    )
}

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Cloud</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <SimpleHeader/>
                <div className="bg-primary-200 h-96">
                    <h2 className="text-accent-600 text-4xl font-bold">Drive Cloud Storage</h2>
                    <SignUpButton/>
                </div>
                <div className="bg-primary-50 h-96">
                    <h2 className="text-primary-800 text-4xl font-bold">Simple. Anywhere. Connected.</h2>
                </div>
            </main>
        </div>
    )
}

export default Home
