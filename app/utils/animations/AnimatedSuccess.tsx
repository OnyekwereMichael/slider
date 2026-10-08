import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AnimatedSuccess = ({ text = "" }: { text?: string }) => {
    return (
        <div className="lottie-animation">
            <DotLottieReact
                src="https://lottie.host/22b9a177-a32d-46db-a49e-190410b9cf57/gWpWGVk1f2.lottie"
                loop
                autoplay
            />

            <p>{text}</p>
        </div>
    );
};

export default AnimatedSuccess;