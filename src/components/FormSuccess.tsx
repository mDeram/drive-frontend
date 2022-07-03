import { BiCheckCircle } from "react-icons/bi";

interface FormSuccessProps {
    success?: string | null;
}

const FormSuccess: React.FC<FormSuccessProps> = ({
    success
}) => {
    if (!success || success === "") return null;

    return <span className="text-green-400 flex items-center mt-2"><BiCheckCircle className="mx-1"/>{success}</span>;
}

export default FormSuccess;
