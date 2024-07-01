// // src/App.tsx
// import React, { useState } from 'react';
// import WebcamComponent from './components/WebCamComponent';
// import FaceDetectionComponent from './components/FaceDetection';


// const App: React.FC = () => {
//   const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <h1>Invigilation System</h1>
//       <WebcamComponent setVideoRef={setVideoRef} />
//       <FaceDetectionComponent videoRef={videoRef} />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import WebcamComponent from './components/WebCamComponent';
import FaceDetectionComponent from './components/FaceDetection';
import VoiceDetectionComponent from './components/VoiceDetection';


const App: React.FC = () => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [voiceDetected, setVoiceDetected] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Invigilation System</h1>
      <div className="relative" style={{position:"relative"}}>
        <WebcamComponent setVideoRef={setVideoRef} />
        <div className="absolute inset-0" style={{position:"absolute", top:0, bottom:0, left:0, right:0}}>
          <FaceDetectionComponent videoRef={videoRef} />
        </div>
      </div>
      <VoiceDetectionComponent setVoiceDetected={setVoiceDetected} />
      <p>Voice Detected: {voiceDetected ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default App;
