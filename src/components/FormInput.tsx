import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

export function getFirstError(validators: Validator | Validator[] | undefined, value: string): string | null {
    if (!validators) return null;
    const toValidate = typeof validators === "function" ? [validators] : validators;

    for (let i = 0; i < toValidate.length; i++) {
        const error = toValidate[i](value);
        if (error) return error;
    }

    return null;
}

export type Validator = (value: string) => string | null;

interface FormInputProps {
    name: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    validate?: Validator | Validator[];
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    value,
    handleChange,
    placeholder,
    type,
    validate
}) => {
    const [showError, setShowError] = useState(false);

    function renderError() {
        if (!showError) return;

        const error = getFirstError(validate, value);
        if (!error) return;

        return <span className="text-red-400 flex items-center"><BiErrorCircle className="mx-1"/>{error}</span>;
    }

    return (
        <div className="w-full flex flex-col my-2">
            <label htmlFor={name}>{placeholder}</label>
            <input
                className="p-3 rounded-lg my-2 border border-primary-400 focus:border-primary-800 outline-none"
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required
                onBlur={() => setShowError(true)}
            />
            {renderError()}
        </div>
    );
}

export default FormInput;
