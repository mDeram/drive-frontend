import { BiErrorCircle } from "react-icons/bi";

interface FormErrorProps {
    error: string | null;
}

const FormError: React.FC<FormErrorProps> = ({
    error
}) => {
    if (!error) return null;

    return <span className="text-red-400 flex items-center mt-2"><BiErrorCircle className="mx-1"/>{error}</span>;
}

export default FormError;
