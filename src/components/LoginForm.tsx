import { MutationLoginArgs, useLoginMutation } from "../generated/graphql";
import Form from "./Form";
import validators from "../utils/validators";
import { FormSubmitFunction } from "./Form";

const inputs = {
    email: {
        type: "email",
        name: "email",
        placeholder: "Email",
        validators: validators["email"]
    },
    password: {
        type: "password",
        name: "password",
        placeholder: "Password",
        validators: validators["password"]
    }
}


const LoginForm: React.FC = () => {
    const [,login] = useLoginMutation();

    const handleSubmit: FormSubmitFunction = async (values) => {
        const response = await login({ ...(values as MutationLoginArgs) })
        if (response.data?.login.__typename === "FormErrors")
            return response.data.login.errors;

        return null;
    }

    return (
        <Form
            title="Login"
            name="Login"
            inputs={inputs}
            onSubmit={handleSubmit}
            link={{ href: "/register", text: "Sign up" }}
        />
    );
}

export default LoginForm;
