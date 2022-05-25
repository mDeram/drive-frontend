import React from "react";
import BuyStoragePopup from "./BuyStoragePopup";

const BuyStorage: React.FC = () => {
    return (
        <BuyStoragePopup trigger={
            <button className="btn bg-primary-200 hover:bg-primary-300 text-accent-600 mb-4 border border-accent-600 font-bold">
                Buy more storage
            </button>
        }/>
    );
}

export default BuyStorage;
