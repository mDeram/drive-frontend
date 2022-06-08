import React, { useCallback, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Popup from "./Popup";
import FormError from "./FormError";
import { useDeleteUserMutation } from "../generated/graphql";

interface DeleteAccountPopupProps {
    trigger: JSX.Element
}

const DeleteAccountPopup: React.FC<DeleteAccountPopupProps> = ({
    trigger
}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [, deleteUser] = useDeleteUserMutation();
    const inputRef = useCallback((input: HTMLInputElement) => {
        if (!input) return;
        input.focus();
    }, []);

    async function deleteAccount(close: Function) {
        const result = await deleteUser({ password: value });
        if (result.data?.deleteUser.__typename === "FormErrors") {
            setError(result.data.deleteUser.errors[0].message);
        } else if (result.data?.deleteUser.response) {
            //TODO show notification
            close();
        }
    }

    return (
        <Popup onOpen={() => { setValue(""); setError(null) }} trigger={trigger}>
            {(close: () => void) => (
                <div className="flex flex-col bg-primary-50 p-5 h-64 text-lg max-w-screen-xs w-screen justify-between">
                    <div className="flex justify-between">
                        <p>Delete your Account</p>
                        <button className="btn p-1 text-lg" onClick={close}><AiOutlineClose/></button>
                    </div>
                    <div>
                        <input
                            className="w-full p-2 border border-primary-800"
                            ref={inputRef}
                            type="password"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder="Password"
                        />
                        <div className="absolute">
                            <FormError error={error}/>
                        </div>
                    </div>
                    <button className={`test-delete-account-confirm
                            btn text-primary-50 bg-accent-600 hover:bg-accent-700
                            font-bold px-4 self-end
                            disabled:text-primary-50/25 disabled:bg-accent-600/25
                            disabled:cursor-default
                        `}
                        onClick={() => deleteAccount(close)}
                    >Delete Account</button>
                </div>
            )}
        </Popup>
    );
}

export default DeleteAccountPopup;
