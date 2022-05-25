import React, { useEffect, useState } from "react";
import useOuterClick from "../hooks/useOuterClick";

export interface PopupProps {
    trigger?: JSX.Element | ((open: () => void) => JSX.Element | void);
    closeOnDocumentClick?: boolean;
    hideTriggerOnShow?: boolean;
    openRef?: React.MutableRefObject<Function | undefined>;
    closeRef?: React.MutableRefObject<Function | undefined>;
    onClose?: Function;
    onOpen?: Function;
}

const Popup: React.FC<PopupProps> = ({
    children,
    trigger,
    closeOnDocumentClick = true,
    hideTriggerOnShow = false,
    openRef,
    closeRef,
    onClose,
    onOpen
}) => {
    const [show, setShow] = useState(false);
    const ref = useOuterClick(handleSetHide, closeOnDocumentClick ? show : false);

    useEffect(() => {
        if (openRef) openRef.current = handleSetShow;
        if (closeRef) closeRef.current = handleSetHide;
        return () => {
            if (openRef) openRef.current = undefined;
            if (closeRef) closeRef.current = undefined;
        }
    }, []);

    function handleSetShow() {
        setShow(true);
        if (onOpen) onOpen();
    }

    function handleSetHide() {
        setShow(false);
        if (onClose) onClose();
    }

    function renderTrigger() {
        if (!trigger) return;
        if (typeof trigger === "function")
            return trigger(handleSetShow);
        return React.cloneElement(trigger, { onClick: handleSetShow });
    }

    function renderChildren() {
        if (typeof children === "function")
            return children(handleSetHide);
        return children;
    }

    return (
        <>
            {hideTriggerOnShow
                ? !show && renderTrigger()
                : renderTrigger()
            }
            {show && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40">
                    <div className="fixed w-fit h-fit inset-0 m-auto z-40" ref={ref as any}>
                        {renderChildren()}
                    </div>
                </div>
            )}
        </>
    )
}

export default Popup;
