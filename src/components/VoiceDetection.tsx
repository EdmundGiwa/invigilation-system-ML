import React, { useEffect, useState } from 'react';

const VoiceDetectionComponent: React.FC<{ setVoiceDetected: (detected: boolean) => void }> = ({ setVoiceDetected }) => {
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.onresult = (event: any) => {
                if (event.results.length > 0) {
                    setVoiceDetected(true);
                }
            };
            recognition.onerror = () => {
                setVoiceDetected(false);
            };
            recognition.onend = () => {
                setVoiceDetected(false);
            };
            recognition.start();
        }
    }, [setVoiceDetected]);

    return null;
};

export default VoiceDetectionComponent;