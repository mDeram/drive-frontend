import React from "react";
import { AiFillCloud } from "react-icons/ai";

interface BuyOfferProps {
    link: string;
    title: string;
    description: string;
    price: string;
    duration: string;
}

const BuyOffer: React.FC<BuyOfferProps> = ({
    link,
    title,
    description,
    price,
    duration
}) => {
    return (
        <div className="flex flex-col p-5 first:border-r border-primary-400">
            <AiFillCloud className="text-2xl text-accent-600"/>
            <h3 className="font-semibold mb-5">{title}</h3>
            <p className="mb-20">{description}</p>
            <p><span className="text-xl font-bold pr-2">{price}</span>for {duration}</p>
            <a className="btn w-24 mt-5 text-white font-bold bg-accent-600 hover:bg-accent-700 text-center" href={link} target="_blank" rel="noopener noreferrer">Buy</a>
        </div>
    );
}

export default BuyOffer;
