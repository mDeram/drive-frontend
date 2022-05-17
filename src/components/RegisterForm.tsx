import { ChangeEvent, FormEvent, useState } from "react";
import { RegisterInput, useRegisterMutation } from "../generated/graphql";
import FormInput from "./FormInput";
import validator from "validator";

const inputs = [
    {
        type: "text",
        name: "username",
        placeholder: "Username",
        validate: [
            (value: string) => validator.isLength(value, { min: 1 }) ? null : "Username must be at least 1 character long",
            (value: string) => validator.isLength(value, { max: 255 }) ? null : "Username must be at most 255 character long"
        ]
    },
    {
        type: "email",
        name: "email",
        placeholder: "Email",
        validate: [
            (value: string) => validator.isEmail(value) ? null : "Invalid email",
            (value: string) => validator.isLength(value, { max: 255 }) ? null : "Email must be at most 255 character long"
        ]
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        validate: [
            (value: string) => validator.isLength(value, { min: 5 }) ? null : "Password must be at least 5 character long",
            (value: string) => validator.isLength(value, { max: 255 }) ? null : "Password must be at most 255 character long"
        ]
    },
]


const RegisterForm: React.FC = () => {
    const [,register] = useRegisterMutation();
    const [values, setValues] = useState<Record<string, string>>(
        inputs.reduce((prev, input) => ({ ...prev, [input.name]: "" }), {})
    );
    console.log(values);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //TODO data validation
        register({ inputs: (values as RegisterInput) })
    }

    return (
        <form className="container bg-primary-200 m-auto flex flex-col items-center" onSubmit={handleSubmit}>
            <h1>Register</h1>
            {inputs.map((input, i) => (
                <FormInput key={i} {...input} handleChange={handleChange} value={values[input.name]}/>
            ))}
            <button className="btn">Register</button>
        </form>
    );
}

export default RegisterForm;
