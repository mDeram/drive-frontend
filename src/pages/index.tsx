import type { NextPage } from 'next'
import Head from 'next/head'
import DriveTable from '../components/DriveTable'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Cloud</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <Header/>
                <div className="flex grow">
                    <SideMenu/>
                    <DriveTable/>
                </div>
            </main>
        </div>
    )
}

export default Home
