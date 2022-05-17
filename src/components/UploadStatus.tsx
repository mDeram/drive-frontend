import React from "react"
import { UploadMutationVariables } from "../generated/graphql";

interface UploadStatusProps {
    toUpload: UploadMutationVariables[];
    uploading: UploadMutationVariables | null;
    uploaded: UploadMutationVariables[];
}

const UploadStatus: React.FC<UploadStatusProps> = ({
    toUpload,
    uploading,
    uploaded
}) => {
    const total = uploaded.length + toUpload.length + (uploading ? 1 : 0);
    const done = uploaded.length;

    function renderProgress() {
        if (!toUpload.length && !uploading) return;

        const percent = done / total * 100;

        return (
            <div>
                <div className="w-full bg-secondary-400 h-1 rounded-sm">
                    <div className="bg-accent-600 h-full" style={{width: `${percent}%`}}></div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-x-0 w-fit m-auto bottom-0 z-50 bg-accent-300 border rounded-t-md">
            {uploading?.file.name}
            {renderProgress()}
            {`${done} / ${total}`}
        </div>
    );
}

export default UploadStatus;
