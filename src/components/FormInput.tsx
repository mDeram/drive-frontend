import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

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

        return <span className="text-red-400">{error}</span>;
    }

    return (
        <div>
            <input
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
