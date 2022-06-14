import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, useState } from "react";
import { FormError } from "../generated/graphql";
import getFirstValidationError from "../utils/getFirstValidationError";
import { Validator } from "../utils/validators";
import FormErrorComponent from "./FormError";
import FormInput from "./FormInput";

export type Input = {
    name: string;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    validators?: Validator | Validator[];
}

interface FormProps {
    inputs: Record<string, Input>;
    onSubmit: FormSubmitFunction;
    name: string;
    title: string;
    link: { href: string, text: string };
    renderFormErrorHelp?: RenderFormErrorHelp;
}

export type FormSubmitFunction = (values: Record<string, string>) => Promise<FormError[] | null>;
export type RenderFormErrorHelp = (error: string) => JSX.Element | null;

const Form: React.FC<FormProps> = ({
    inputs,
    onSubmit,
    name,
    title,
    link,
    renderFormErrorHelp
}) => {
    const inputsEntries = Object.entries(inputs);

    const [formError, setFormError] = useState<string | null>(null);
    const [inputsData, setInputsData] = useState<Record<string, { value: string, error: string | null }>>(
        inputsEntries.reduce((prev, [key, value]) => ({
            ...prev,
            [key]: { value: "", error: getFirstValidationError(value.validators, "") }
        }), {})
    );

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputsData(prev => {
            const { name, value } = e.target;
            const error = getFirstValidationError(inputs[name].validators, value);

            return {
                ...prev,
                [name]: { value, error }
            }
        });
    }

    function setError(name: string, newError: string) {
        setInputsData(prev => {
            const value = prev[name].value;
            const error = newError;

            return {
                ...prev,
                [name]: { value, error }
            }
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const error = inputsEntries.find(([key, value]) => !!getFirstValidationError(value.validators, inputsData[key].value));
        if (error) {
            setFormError("One or more fields is invalid");
            return;
        }

        const results = Object.entries(inputsData).reduce((prev, [key, value]) => ({
            ...prev,
            [key]: value.value
        }), {});

        const errors = await onSubmit(results);
        if (!errors) return;

        errors.forEach(({ field, message }) => field
            ? setError(field, message)
            : setFormError(message)
        );
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-accent-200 to-accent-300">
            <form className="max-w-screen-xs w-full bg-primary-50 flex flex-col items-center rounded-lg p-12 shadow-xl"
                onSubmit={handleSubmit}
            >
                <h1 className="text-accent-400 font-semibold text-4xl">{title}</h1>
                <div className="w-full my-4">
                    {inputsEntries.map(([key, input]) => (
                        <FormInput key={key} {...input} handleChange={handleChange} {...inputsData[key]}/>
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
                            className="btn ml-5 p-0 bg-transparent link-simple hover:bg-transparent"
                        >{link.text}</a>
                    </div>
                </div>
                <FormErrorComponent error={formError}/>
                {formError && renderFormErrorHelp && renderFormErrorHelp(formError)}
            </form>
        </div>
    );
}

export default Form;
