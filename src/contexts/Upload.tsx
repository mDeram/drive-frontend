import { createContext, useContext, useEffect, useState } from "react";
import UploadStatus from "../components/UploadStatus";
import { UploadMutationVariables, useDuQuery, useUploadMutation } from "../generated/graphql";

export type UploadContextType = {
    pushUploads: (uploads: UploadMutationVariables[]) => void;
}

export const UploadContext = createContext<UploadContextType | null>(null);

export const UploadProvider: React.FC = ({
    children
}) => {
    const [, runDu] = useDuQuery({ pause: true, requestPolicy: "network-only" });
    const [uploadResult, uploadFile] = useUploadMutation();
    const [toUpload, setToUpload] = useState<UploadMutationVariables[]>([]);
    const [uploading, setUploading] = useState<UploadMutationVariables | null>(null);
    const [uploaded, setUploaded] = useState<UploadMutationVariables[]>([]);

    /* Consumers are rerendered when provider value change, since we are giving
     * an object to it, every time UploadProvider will render, consumers will
     * be rerendered too, we use a state to avoid that
     */
    //TODO test if it works or if we should use a useEffect
    //TODO repass that section, useMemo?
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

        setUploaded(prev => [...prev, uploading]);
        setUploading(null);
    }, [uploadResult]);

    return (
        <UploadContext.Provider value={value}>
            <UploadStatus toUpload={toUpload} uploading={uploading} uploaded={uploaded}/>
            {children}
        </UploadContext.Provider>
    )
}

export const useUploadContext = () => {
    return useContext(UploadContext);
};
