import type { NextPage } from 'next'
import Head from 'next/head'
import DriveTable from '../components/DriveTable'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import usePath from '../hooks/usePath'

const Home: NextPage = () => {
    const [path, appendPath, setPath] = usePath();

    return (
        <div>
            <Head>
                <title>Cloud</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <Header/>
                <div className="flex grow">
                    <SideMenu path={path} setPath={setPath}/>
                    <DriveTable path={path} appendPath={appendPath} setPath={setPath}/>
                </div>
            </main>
        </div>
    )
}

export default Home
