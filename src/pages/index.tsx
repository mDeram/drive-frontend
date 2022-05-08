import type { NextPage } from 'next'
import Head from 'next/head'
import DriveTable from '../components/DriveTable'

const Home: NextPage = () => {
    return (
        <div className="flex flex-col items-center">
            <Head>
                <title>Cloud</title>
            </Head>

            <main className="h-screen w-full">
                <DriveTable/>
            </main>
            <footer>
                <ul>
                    <li>info</li>
                    <li>info</li>
                    <li>info</li>
                    <li>info</li>
                    <li>info</li>
                </ul>
            </footer>
        </div>
    )
}

export default Home
