import Form, { RenderFormErrorHelp } from "./Form";
import validators from "../utils/validators";
import { FormSubmitFunction } from "./Form";
import { MutationContactArgs, QueryContactArgs, useContactMutation } from "../generated/graphql";

const inputs = {
    email: {
        type: "email",
        name: "email",
        placeholder: "Email",
        validators: validators["email"]
    },
    subject: {
        type: "text",
        name: "subject",
        placeholder: "Subject",
        validators: validators["subject"]
    },
    message: {
        type: "textarea",
        name: "message",
        placeholder: "Message",
        validators: validators["message"]
    }
}


const ContactForm: React.FC = () => {
    const [,contact] = useContactMutation();

    const handleSubmit: FormSubmitFunction = async (values) => {
        const response = await contact({ ...(values as MutationContactArgs) })
        if (response.data?.contact.__typename === "FormErrors")
            return response.data.contact.errors;

        return "Email sent";
    }

    const renderFormErrorHelp: RenderFormErrorHelp = (error: string) => {
        if (error !== "We could not send your email, try again later") return null;
        return <p><a className="link-simple" href="mailto:drive@mderam.com" target="_blank">Please email us directly.</a></p>
    }

    return (
        <Form
            title="Contact Us"
            name="Send"
            inputs={inputs}
            onSubmit={handleSubmit}
            link={{ href: "/", text: "Index" }}
            renderFormErrorHelp={renderFormErrorHelp}
        />
    );
}

export default ContactForm;
