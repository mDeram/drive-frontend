import type { NextPage } from 'next'
import Head from 'next/head'
import DriveContent from '../components/DriveContent'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import usePath from '../hooks/usePath'
import useSearch from '../hooks/useSearch'

const Home: NextPage = () => {
    const [path, appendPath, setPath] = usePath();
    const [results, fetching, search] = useSearch(setPath);

    return (
        <div>
            <Head>
                <title>Cloud</title>
            </Head>

            <main className="flex flex-col h-screen w-full">
                <Header setPath={setPath} search={search}/>
                <div className="flex min-h-0 grow">
                    <SideMenu path={path} setPath={setPath}/>
                    <DriveContent
                        path={path}
                        appendPath={appendPath}
                        setPath={setPath}
                        searchResults={results}
                        searchFetching={fetching}
                    />
                </div>
            </main>
        </div>
    )
}

export default Home
