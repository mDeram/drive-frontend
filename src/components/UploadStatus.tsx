import React, { useEffect, useState } from "react"
import Popup from "./Popup";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { UploadMutationVariables, Uploaded } from "../contexts/Upload";

interface UploadStatusProps {
    clearUploads: () => void;
    toUpload: UploadMutationVariables[];
    uploading: UploadMutationVariables | null;
    uploaded: Uploaded[];
}

const UploadStatus: React.FC<UploadStatusProps> = ({
    clearUploads,
    toUpload,
    uploading,
    uploaded
}) => {
    const [canShowPopup, setCanShowPopup] = useState(false);
    const total = uploaded.length + toUpload.length + (uploading ? 1 : 0);
    const done = uploaded.length;

    useEffect(() => {
        if (total !== done) setCanShowPopup(false);
        else setCanShowPopup(true);
    }, [total, done]);

    if (!total) return null;

    function renderProgress() {
        if (!toUpload.length && !uploading) return;

        const percent = done / total * 100;

        return (
            <div className="w-full bg-primary-50 h-1 absolute top-full">
                <div className="bg-accent-600 h-full transition-all duration-300" style={{width: `${percent}%`}}></div>
            </div>
        )
    }

    function renderDoneDiv() {
        const imported = uploaded.filter(item => item.result).length;
        const errored = uploaded.length - imported;
        return (<>
            <div className="flex items-center"><RiCheckFill className="text-xl mr-1"/>{imported} files imported</div>
            {!!errored && <div className="flex items-center ml-2"><RiCloseFill className="text-xl mr-1"/>{errored} errors</div>}
        </>)
    }

    const buttonStyle = "btn bg-transparent hover:bg-transparent font-semibold hover:text-accent-400"

    return (
        <Popup hideTriggerOnShow trigger={
            open => (
                <div className={`fixed flex flex-col w-full max-w-xl inset-x-0
                    m-auto bottom-0 mb-5 z-50 bg-primary-800 border
                    text-primary-50
                `}>
                    <div className="flex items-center justify-between mx-4 h-10">
                        {uploading
                            ? <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">Importing {uploading?.file.name}</p>
                            : renderDoneDiv()
                        }
                        {canShowPopup &&
                            <div className="shrink-0">
                                {/*<button className={buttonStyle} onClick={open}>Show Details</button>*/}
                                <button className={buttonStyle} onClick={() => clearUploads()}>Close</button>
                            </div>
                        }
                    </div>
                    {renderProgress()}
                </div>
            )}>{
            close => (
                <div className="w-10 h-10 bg-accent-400">
                    <button className="btn" onClick={() => {clearUploads(); close()}}>Close</button>
                </div>
            )
        }</Popup>
    );
}

export default UploadStatus;
