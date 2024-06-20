import { createContext, useContext, useEffect, useState } from "react";
import UploadStatus from "../components/UploadStatus";
import { useDuQuery } from "../generated/graphql";

export interface UploadFileParams {
    path: string;
    additionalPath: string;
    file: File;
}

interface UseUploadFileResult {
    fetching: boolean;
    data: null | any;
    error: null | any;
}

// TODO test what happens when page get reloaded during a file upload
const useUploadFile = () => {
    const [result, setResult] = useState<UseUploadFileResult>({
        fetching: false,
        data: null,
        error: null
    });

    async function uploadFile({ path, additionalPath, file }: UploadFileParams) {
        setResult({
            fetching: true,
            data: null,
            error: null
        });

        const formData = new FormData();
        formData.append("path", path);
        formData.append("additionalPath", additionalPath);
        formData.append("file", file);

        // DOING change url
        const result = await fetch("http://localhost:8000/upload", {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        let response;
        try {
            response = await result.json()
        } catch (err) {
            console.error("could not parse json file upload response", err);
        }

        setResult({
            fetching: false,
            data: result.ok ? response : null,
            error: result.ok ? (response ?? "An error occured") : null
        });
    }

    return [result, uploadFile] as const;
}

export type UploadContextType = {
    pushUploads: (uploads: UploadFileParams[]) => void;
}

export const UploadContext = createContext<UploadContextType | null>(null);

export type Uploaded = UploadFileParams & { result: boolean, error: string | undefined };

export const UploadProvider: React.FC = ({
    children
}) => {
    const [, runDu] = useDuQuery({ pause: true, requestPolicy: "network-only" });
    const [uploadResult, uploadFile] = useUploadFile();
    const [toUpload, setToUpload] = useState<UploadFileParams[]>([]);
    const [uploading, setUploading] = useState<UploadFileParams | null>(null);
    const [uploaded, setUploaded] = useState<Uploaded[]>([]);

    /* Consumers are rerendered when provider value change, since we are giving
     * an object to it, every time UploadProvider will render, consumers will
     * be rerendered too, we use a state to avoid that
     */
    function pushUploads(uploads: UploadFileParams[]) {
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
        const result = Boolean(uploadResult.data);
        const error = uploadResult.error;

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

export const useUploadContext = () => useContext(UploadContext)!;
