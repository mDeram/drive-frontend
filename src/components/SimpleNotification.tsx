import classNames from "classnames";
import React from "react";

interface SimpleNotificationProps {
    type: "success" | "error";
    text: string;
}

const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
}

const SimpleNotification: React.FC<SimpleNotificationProps> = ({
    type,
    text
}) => {
    return (
        <div className={classNames("rounded-sm text-primary-50 px-8 py-4", colors[type])}>
            <p className="font-bold">{text}</p>
        </div>
    );
}

export default SimpleNotification;
