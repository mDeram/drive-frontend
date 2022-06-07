import { RegisterInput, useRegisterMutation } from "../generated/graphql";
import Form, { FormSubmitFunction } from "./Form";
import validators from "../utils/validators";
import { useRouter } from "next/router";

const inputs = {
    username: {
        type: "text",
        name: "username",
        placeholder: "Username",
        validators: validators["username"]
    },
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
};

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [,register] = useRegisterMutation();

    const handleSubmit: FormSubmitFunction = async (values) => {
        const response = await register({ inputs: (values as RegisterInput) })
        if (response.data?.register.__typename === "FormErrors")
            return response.data.register.errors;

        if (response.data?.register.response)
            router.push("/login");

        return null;
    }

    return (
        <Form
            title="Register"
            name="Register"
            inputs={inputs}
            onSubmit={handleSubmit}
            link={{ href: "/login", text: "Sign in" }}
        />
    );
}

export default RegisterForm;
