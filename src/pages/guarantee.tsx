import type { NextPage } from 'next'
import Head from 'next/head'
import SimpleHeader from '../components/SimpleHeader';

const Guarantee: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Drive - Guarantee</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <SimpleHeader/>
                <div className="m-auto text-2xl sm:text-3xl">
                    <p>This service is provided "as is", without warranty of any kind.</p>
                </div>
            </main>
        </div>
    )
}

export default Guarantee;
