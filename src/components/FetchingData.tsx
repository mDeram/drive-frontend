import { AiOutlineLoading } from "react-icons/ai";

const FetchingData: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-xl font-semibold">
            <AiOutlineLoading className="animate-spin text-6xl"/>
        </div>
    )
}

export default FetchingData;
