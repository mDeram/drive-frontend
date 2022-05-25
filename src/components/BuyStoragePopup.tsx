import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import BuyOffer from "./BuyOffer";
import Popup from "./Popup";

interface BuyStoragePopupProps {
    trigger: JSX.Element
}

const BuyStoragePopup: React.FC<BuyStoragePopupProps> = ({
    trigger
}) => {
    return (
        <Popup trigger={trigger}>
            {(close: () => void) => (
                <div className="max-w-screen-sm">
                    <button className="btn absolute top-0 right-0 bg-transparent hover:bg-transparent text-xl" onClick={close}><AiOutlineClose/></button>
                    <div className="flex bg-primary-50">
                        <BuyOffer
                            link={process.env.NEXT_PUBLIC_STRIPE_PLAN_2 || ""}
                            title="Drive 1 month"
                            description="Cloud storage of 1Go"
                            price="2,00 €"
                            duration="1 month"
                        />
                        <BuyOffer link={process.env.NEXT_PUBLIC_STRIPE_PLAN_5 || ""}
                            title="Drive 3 month"
                            description="Cloud storage of 1Go"
                            price="5,00 €"
                            duration="3 months"
                        />
                    </div>
                </div>
            )}
        </Popup>
    );
}

export default BuyStoragePopup;
