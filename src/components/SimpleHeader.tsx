import React from "react";
import { AiFillCloud } from "react-icons/ai";

const SignInButton: React.FC = () => {
    return (
        <a href="/login" className="btn text-black bg-transparent hover:bg-transparent hover:underline font-bold px-5">Sign in</a>
    )
}

const SimpleHeader: React.FC = () => {
    return (
        <header className="p-2 px-5 w-full flex items-center justify-between bg-primary-50 text-accent-600">
            <div className="flex items-center">
                <AiFillCloud className="text-4xl"/>
                <h1 className="text-2xl font-bold ml-3">Drive</h1>
            </div>
            <SignInButton/>
        </header>
    );
}

export default SimpleHeader;
