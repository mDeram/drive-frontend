import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, useState } from "react";
import FormInput, { getFirstError, Validator } from "./FormInput";

export type Input = {
    name: string;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    validate?: Validator | Validator[];
}

interface FormProps {
    inputs: Input[];
    onSubmit: Function;
    name: string;
    title: string;
}

const Form: React.FC<FormProps> = ({
    inputs,
    onSubmit,
    name,
    title
}) => {
    const [values, setValues] = useState<Record<string, string>>(
        inputs.reduce((prev, input) => ({ ...prev, [input.name]: "" }), {})
    );

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = inputs.find(input => !!getFirstError(input.validate, values[input.name]));
        if (result) return;

        onSubmit(values);
    }

    return (
        <form className="container bg-primary-200 m-auto flex flex-col items-center" onSubmit={handleSubmit}>
            <h1>{title}</h1>
            {inputs.map((input, i) => (
                <FormInput key={i} {...input} handleChange={handleChange} value={values[input.name]}/>
            ))}
            <input type="submit" value={name} className="btn"/>
        </form>
    );
}

export default Form;
