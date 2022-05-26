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
    link: { href: string, text: string };
}

const Form: React.FC<FormProps> = ({
    inputs,
    onSubmit,
    name,
    title,
    link
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
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-accent-200 to-accent-300">
            <form className="max-w-screen-xs w-full bg-primary-50 flex flex-col items-center rounded-lg p-12 shadow-xl" onSubmit={handleSubmit}>
                <h1 className="text-accent-400 font-semibold text-4xl">{title}</h1>
                <div className="w-full my-4">
                    {inputs.map((input, i) => (
                        <FormInput key={i} {...input} handleChange={handleChange} value={values[input.name]}/>
                    ))}
                </div>
                <div className="flex relative">
                    <button
                        type="submit"
                        className="btn px-6 bg-accent-400 hover:bg-accent-600 text-primary-50 text-xl font-semibold rounded-lg"
                    >{name}</button>
                    <div className="absolute left-full h-full w-full flex items-center">
                        <a
                            href={link.href}
                            className="btn ml-5 p-0 bg-transparent text-sm text-accent-600 hover:underline hover:bg-transparent"
                        >{link.text}</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
