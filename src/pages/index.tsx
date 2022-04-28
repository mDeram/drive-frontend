import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import DriveTable from '../components/DriveTable'
import getFiles from '../utils/readFiles'

interface HomeProps {
    files: string[];
}

const Home: NextPage<HomeProps> = ({
    files
}) => {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <Head>
                <title>Cloud</title>
            </Head>

            <main className="min-h-screen min-w-screen w-full">
                <DriveTable files={files}/>
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

export const getStaticProps: GetStaticProps = async () => {
    const files = await getFiles();

    return {
        props: {
            files
        }
    };
}

export default Home
