import { RegisterInput, useRegisterMutation } from "../generated/graphql";
import validator from "validator";
import Form from "./Form";
import { useRouter } from "next/router";

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
    const router = useRouter();

    async function handleSubmit(values: Record<string, string>) {
        const response = await register({ inputs: (values as RegisterInput) })
        if (response.data?.register)
            router.push("/app");
    }

    return (
        <Form title="Register" name="Register" inputs={inputs} onSubmit={handleSubmit}/>
    );
}

export default RegisterForm;
