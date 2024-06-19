import { createContext, useContext, useEffect, useState } from "react";
import UploadStatus from "../components/UploadStatus";
import { useDuQuery } from "../generated/graphql";

// TODO reimplement
const useUploadMutation = () => [{ fetching: false, data: { upload: undefined }, error: { message: undefined }}, (...args: any) => {}] as const;

export type UploadMutationVariables = {
    path: string;
    additionalPath: string;
    file: any; // Todo remove any
};

export type UploadContextType = {
    pushUploads: (uploads: UploadMutationVariables[]) => void;
}

export const UploadContext = createContext<UploadContextType | null>(null);

export type Uploaded = UploadMutationVariables & { result: boolean, error: string | undefined };

export const UploadProvider: React.FC = ({
    children
}) => {
    const [, runDu] = useDuQuery({ pause: true, requestPolicy: "network-only" });
    const [uploadResult, uploadFile] = useUploadMutation();
    const [toUpload, setToUpload] = useState<UploadMutationVariables[]>([]);
    const [uploading, setUploading] = useState<UploadMutationVariables | null>(null);
    const [uploaded, setUploaded] = useState<Uploaded[]>([]);

    /* Consumers are rerendered when provider value change, since we are giving
     * an object to it, every time UploadProvider will render, consumers will
     * be rerendered too, we use a state to avoid that
     */
    function pushUploads(uploads: UploadMutationVariables[]) {
        setToUpload(prev => [...prev, ...uploads]);
    }

    const [value] = useState({ pushUploads });

    // Force run disk usage query when all files have been uploaded
    useEffect(() => {
        if (!uploading && !toUpload.length) runDu();
    }, [toUpload, uploading]);

    // When nothing is currently being uploaded, put an item from toUpload
    // to uploading
    useEffect(() => {
        if (uploading || !toUpload.length) return;

        setUploading(toUpload[0]);
        setToUpload(prev => [...prev].slice(1));
    }, [toUpload, uploading]);

    // When uploading item is set, upload it.
    useEffect(() => {
        if (!uploading) return;

        const { path, additionalPath, file } = uploading;

        uploadFile({
            path,
            additionalPath,
            file
        });
    }, [uploading]);

    // When uploadResult is not fetching anymore and there is an item in
    // uploading, put the uploading item to uploaded.
    useEffect(() => {
        if (!uploading || uploadResult.fetching) return;
        const result = uploadResult.data?.upload || false;
        const error = uploadResult.error?.message;

        setUploaded(prev => [...prev, { ...uploading, result, error }]);
        setUploading(null);
    }, [uploadResult]);

    function clearUploads() {
        setToUpload([])
        setUploading(null)
        setUploaded([])
    }

    return (
        <UploadContext.Provider value={value}>
            <UploadStatus clearUploads={clearUploads} toUpload={toUpload} uploading={uploading} uploaded={uploaded}/>
            {children}
        </UploadContext.Provider>
    )
}

export const useUploadContext = () => {
    return useContext(UploadContext);
};
