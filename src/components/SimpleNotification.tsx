import classNames from "classnames";
import React from "react";

interface NotificationSuccessProps {
    type: "success" | "error";
    title: string;
    text: string;
}

const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
}

const SimpleNotification: React.FC<NotificationSuccessProps> = ({
    type,
    title,
    text
}) => {
    return (
        <div className={classNames("rounded-sm text-primary-50", colors[type])}>
            <p className="font-bold">{title}</p>
            <p>{text}</p>
        </div>
    );
}

export default SimpleNotification;
