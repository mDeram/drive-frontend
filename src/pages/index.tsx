import type { NextPage } from 'next'
import Head from 'next/head'
import SimpleHeader from '../components/SimpleHeader'
import { AiOutlineCloudUpload, AiOutlineCompass, AiOutlineDownload, AiOutlineSearch } from "react-icons/ai";
import FeatureShowcase from '../components/FeatureShowcase';

const SignUpButton: React.FC = () => {
    return (
        <a href="/register" className="btn w-fit text-white bg-accent-600 hover:bg-accent-700 font-bold px-6 py-3 my-10">Sign up</a>
    )
}

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Cloud</title>
            </Head>

            <main className="flex flex-col w-full">
                <SimpleHeader/>
                <div className="bg-accent-600 h-2"></div>
                <div className="bg-primary-200 flex flex-col lg:flex-row justify-between gap-8 py-10 lg:py-20 px-20 lg:px-40">
                    <div className="h-1/2 flex flex-col gap-2 z-10">
                        <h2 className="text-accent-600 text-4xl font-bold">Drive Cloud Storage</h2>
                        <p className="text-xl sm:text-2xl">
                            Upload. Access. Download.<br/>
                            From any device.<br/>
                        </p>
                        <SignUpButton/>
                    </div>
                    <img className="w-[640px] h-auto m-auto lg:-mr-[32rem] xl:-mr-64 2xl:m-0 transition-all" src="images/app_view.png" />
                </div>
                <div className="py-10 lg:py-20 px-20 lg:px-40 flex flex-col gap-16 items-center justify-between bg-gradient-to-t from-accent-200 to-accent-300">
                    <h2 className="text-primary-800 text-4xl font-bold">Manipulate your files. In the cloud.</h2>
                    <div className="flex flex-wrap gap-8 w-full max-w-screen-xl justify-around">
                        <FeatureShowcase
                            title="Upload"
                            Icon={AiOutlineCloudUpload}
                            description="Easy upload, files or entier folders."
                        />
                        <FeatureShowcase
                            title="Download"
                            Icon={AiOutlineDownload}
                            description="Download your files from anywhere."
                        />
                        <FeatureShowcase
                            title="Navigate"
                            Icon={AiOutlineCompass}
                            description="Create folders and use the breadcrumb to navigate with ease."
                        />
                        <FeatureShowcase
                            title="Search"
                            Icon={AiOutlineSearch}
                            description="Run search queries on your files, including content of pdfs and other format."
                        />
                    </div>
                </div>
                <div className="bg-accent-600 h-2 shrink-0"></div>
                <footer className="bg-primary-50">
                    <ul>
                        <li>Contact us</li>
                        <li>No guarantee</li>
                        <li>Repo link</li>
                    </ul>
                </footer>
            </main>
        </div>
    )
}

export default Home
