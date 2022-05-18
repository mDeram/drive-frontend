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
        <form className="container max-w-screen-md bg-primary-200 m-auto flex flex-col items-center rounded-lg p-6" onSubmit={handleSubmit}>
            <h1 className="text-accent-400 font-semibold text-4xl p-4">{title}</h1>
            {inputs.map((input, i) => (
                <FormInput key={i} {...input} handleChange={handleChange} value={values[input.name]}/>
            ))}
            <button type="submit" className="btn bg-accent-400 text-primary-50 text-xl font-semibold m-4 rounded-lg">{name}</button>
        </form>
    );
}

export default Form;
