import validator from "validator";
import { MutationLoginArgs, useLoginMutation } from "../generated/graphql";
import Form from "./Form";

const inputs = [
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


const LoginForm: React.FC = () => {
    const [,login] = useLoginMutation();

    function handleSubmit(values: Record<string, string>) {
        login({ ...(values as MutationLoginArgs) })
    }

    return (
        <Form title="Login" name="Login" inputs={inputs} onSubmit={handleSubmit}/>
    );
}

export default LoginForm;
