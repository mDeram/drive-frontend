import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import FormError from "./FormError";

interface FormInputProps {
    name: string;
    value: string;
    error: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: HTMLInputTypeAttribute;
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    value,
    error,
    handleChange,
    placeholder,
    type
}) => {
    const [showError, setShowError] = useState(false);

    return (
        <div className="w-full flex flex-col my-4">
            <label htmlFor={name}>{placeholder}</label>
            <input
                className="p-3 rounded-lg mt-2 border border-primary-400 focus:border-primary-800 outline-none"
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={() => setShowError(true)}
            />
            {showError && <FormError error={error}/>}
        </div>
    );
}

export default FormInput;
