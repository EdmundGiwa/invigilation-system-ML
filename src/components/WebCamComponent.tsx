// src/components/WebcamComponent.tsx
import React from 'react';
import Webcam from 'react-webcam';

type WebcamComponentProps = {
    setVideoRef: (ref: HTMLVideoElement | null) => void;
};

const WebcamComponent: React.FC<WebcamComponentProps> = ({ setVideoRef }) => {
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    };

    return (
        <Webcam
            audio={false}
            height={480}
            ref={(webcam) => {
                if (webcam && webcam.video) {
                    setVideoRef(webcam.video);
                }
            }}
            screenshotFormat="image/jpeg"
            width={640}
            videoConstraints={videoConstraints}
        />
    );
};

export default WebcamComponent;