import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

function getFirstError(validators: Function[], value: string): string | null {
    for (let i = 0; i < validators.length; i++) {
        const error = validators[i](value);
        if (error) return error;
    }
    return null;
}

type Validator = (value: string) => string | null;

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
        if (!showError || !validate) return;

        const toValidate = typeof validate === "function" ? [validate] : validate;
        const error = getFirstError(toValidate, value);
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
