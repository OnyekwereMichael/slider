import React from "react";
import "./nocontent.css";
import { ImFileText2 } from "react-icons/im";
import NothingHere from "@/app/utils/animations/NothingHere";


interface noContent {
    icon?: any;
    title?: string;
    description?: string;
    style?: any;
}

const NoContent = ({
    icon = <NothingHere />,
    title = "Nothing to see here yet",
    description = "Your data will appear here",
    style = {},
}: noContent) => {
    return (
        <div className="no-cnt-container">
            <div
                className="d-flex align-items-center justify-content-center"
                style={style}
            >
                {icon}
            </div>
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
        </div>
    );
};

export default NoContent;