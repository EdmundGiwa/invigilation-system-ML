// // src/components/FaceDetectionComponent.tsx
// import React, { useRef, useEffect } from 'react';
// import * as faceDetection from '@tensorflow-models/face-detection';
// import * as tf from '@tensorflow/tfjs';

// type FaceDetectionComponentProps = {
//     videoRef: HTMLVideoElement | null;
// };

// const FaceDetectionComponent: React.FC<FaceDetectionComponentProps> = ({ videoRef }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const runFaceDetection = async () => {
//             const model = await faceDetection.load(faceDetection.SupportedModels.MediaPipeFaceDetector);

//             const detectFace = async () => {
//                 if (videoRef && videoRef.readyState === 4) {
//                     const faces = await model.estimateFaces(videoRef);

//                     if (canvasRef.current) {
//                         const ctx = canvasRef.current.getContext('2d');
//                         ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);

//                         faces.forEach(face => {
//                             ctx!.beginPath();
//                             ctx!.rect(
//                                 face.boundingBox.xMin,
//                                 face.boundingBox.yMin,
//                                 face.boundingBox.width,
//                                 face.boundingBox.height
//                             );
//                             ctx!.stroke();
//                         });
//                     }
//                 }
//             };

//             setInterval(detectFace, 100);
//         };

//         runFaceDetection();
//     }, [videoRef]);

//     return <canvas ref={canvasRef} width="640" height="480" />;
// };

// export default FaceDetectionComponent;
// src/components/FaceDetectionComponent.tsx
// src/components/FaceDetectionComponent.tsx
// import React, { useRef, useEffect } from 'react';
// import * as faceDetection from '@tensorflow-models/face-detection';
// import * as tf from '@tensorflow/tfjs';

// type FaceDetectionComponentProps = {
//     videoRef: HTMLVideoElement | null;
// };

// const FaceDetectionComponent: React.FC<FaceDetectionComponentProps> = ({ videoRef }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const runFaceDetection = async () => {
//             const model = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
//                 runtime: 'tfjs' // Specify the runtime
//             });

//             const detectFace = async () => {
//                 if (videoRef && videoRef.readyState === 4) {
//                     const faces = await model.estimateFaces(videoRef);

//                     if (canvasRef.current) {
//                         const ctx = canvasRef.current.getContext('2d');
//                         ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);

//                         faces.forEach(face => {
//                             ctx!.beginPath();
//                             ctx!.rect(
//                                 face.box.xMin,
//                                 face.box.yMin,
//                                 face.box.width,
//                                 face.box.height
//                             );
//                             ctx!.stroke();
//                         });
//                     }
//                 }
//             };

//             setInterval(detectFace, 100);
//         };

//         runFaceDetection();
//     }, [videoRef]);

//     return <canvas ref={canvasRef} width="640" height="480" />;
// };

// export default FaceDetectionComponent;
// src/components/FaceDetectionComponent.tsx
// import React, { useRef, useEffect } from 'react';
// import * as faceDetection from '@tensorflow-models/face-detection';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-cpu';
// import '@tensorflow/tfjs-backend-webgl';

// type FaceDetectionComponentProps = {
//     videoRef: HTMLVideoElement | null;
// };

// const FaceDetectionComponent: React.FC<FaceDetectionComponentProps> = ({ videoRef }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const setupBackends = async () => {
//             await tf.setBackend('webgl');
//             await tf.ready();
//         };

//         const runFaceDetection = async () => {
//             await setupBackends();
//             const model = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
//                 runtime: 'tfjs'
//             });

//             const detectFace = async () => {
//                 if (videoRef && videoRef.readyState === 4) {
//                     const faces = await model.estimateFaces(videoRef);

//                     if (canvasRef.current) {
//                         const ctx = canvasRef.current.getContext('2d');
//                         ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);

//                         faces.forEach(face => {
//                             ctx!.beginPath();
//                             ctx!.rect(
//                                 face.box.xMin,
//                                 face.box.yMin,
//                                 face.box.width,
//                                 face.box.height
//                             );
//                             ctx!.stroke();
//                         });
//                     }
//                 }
//             };

//             setInterval(detectFace, 100);
//         };

//         runFaceDetection();
//     }, [videoRef]);

//     return <canvas ref={canvasRef} width="640" height="480" />;
// };

// export default FaceDetectionComponent;
import React, { useRef, useEffect, useState } from 'react';
import * as faceDetection from '@tensorflow-models/face-detection';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

type FaceDetectionComponentProps = {
  videoRef: HTMLVideoElement | null;
};

const FaceDetectionComponent: React.FC<FaceDetectionComponentProps> = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facesDetected, setFacesDetected] = useState(0);
  const [objectsDetected, setObjectsDetected] = useState<any[]>([]);
  const [lookingAway, setLookingAway] = useState(false);
  const [noFaceDetected, setNoFaceDetected] = useState(false);
  const [voiceDetected, setVoiceDetected] = useState(false);
  const [headphonesDetected, setHeadphonesDetected] = useState(false);

  useEffect(() => {
    const setupBackends = async () => {
      await tf.setBackend('webgl');
      await tf.ready();
    };

    const runFaceDetection = async () => {
      await setupBackends();
      const faceModel = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
        runtime: 'tfjs',
        maxFaces: 3,
      });
      const objectModel = await cocoSsd.load();

      const detectFeatures = async () => {
        if (videoRef && videoRef.readyState === 4) {
          const faces = await faceModel.estimateFaces(videoRef);
          const objects = await objectModel.detect(videoRef);

          setFacesDetected(faces.length);
          setObjectsDetected(objects);
          if (faces.length === 0) {
            setNoFaceDetected(true);
          } else {
            setNoFaceDetected(false);
          }

          // Simple logic to determine "looking away"
          faces.forEach(face => {
            const leftEye = face.keypoints.find(k => k.name === 'leftEye');
            const rightEye = face.keypoints.find(k => k.name === 'rightEye');
            if (leftEye && rightEye) {
              const faceCenterX = (leftEye.x + rightEye.x) / 2;
              const videoCenterX = videoRef.width / 2;
              if (Math.abs(faceCenterX - videoCenterX) > videoRef.width * 0.2) {
                setLookingAway(true);
              } else {
                setLookingAway(false);
              }
            }
          });

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);

            faces.forEach(face => {
              ctx!.beginPath();
              ctx!.rect(
                face.box.xMin,
                face.box.yMin,
                face.box.width,
                face.box.height
              );
              ctx!.stroke();
            });

            objects.forEach(object => {
              ctx!.beginPath();
              ctx!.rect(object.bbox[0], object.bbox[1], object.bbox[2], object.bbox[3]);
              ctx!.stroke();
            });
          }
        }
      };

      setInterval(detectFeatures, 100);
    };

    runFaceDetection();
  }, [videoRef]);

  return (
    <div>
      <canvas ref={canvasRef} width="640" height="480" />
      <div>
        <p>Faces Detected: {facesDetected}</p>
        <p>No Face Detected: {noFaceDetected ? 'Yes' : 'No'}</p>
        <p>Looking Away: {lookingAway ? 'Yes' : 'No'}</p>
        <p>Objects Detected: {objectsDetected.map(obj => obj.class).join(', ')}</p>
        {/* Placeholder for voice detection */}
        <p>Headphones Detected: {headphonesDetected ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default FaceDetectionComponent;
