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
      <WebcamComponent setVideoRef={setVideoRef} />
      <FaceDetectionComponent videoRef={videoRef} />
      <VoiceDetectionComponent setVoiceDetected={setVoiceDetected} />
      <p>Voice Detected: {voiceDetected ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default App;