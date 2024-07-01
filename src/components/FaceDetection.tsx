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
// import React, { useRef, useEffect, useState } from 'react';
// import * as faceDetection from '@tensorflow-models/face-detection';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';

// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-cpu';
// import '@tensorflow/tfjs-backend-webgl';

// type FaceDetectionComponentProps = {
//   videoRef: HTMLVideoElement | null;
// };

// const FaceDetectionComponent: React.FC<FaceDetectionComponentProps> = ({ videoRef }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [facesDetected, setFacesDetected] = useState(0);
//   const [objectsDetected, setObjectsDetected] = useState<any[]>([]);
//   const [lookingAway, setLookingAway] = useState(false);
//   const [noFaceDetected, setNoFaceDetected] = useState(false);

//   const [headphonesDetected, setHeadphonesDetected] = useState(false);

//   useEffect(() => {
//     const setupBackends = async () => {
//       await tf.setBackend('webgl');
//       await tf.ready();
//     };

//     const runFaceDetection = async () => {
//       await setupBackends();
//       const faceModel = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
//         runtime: 'tfjs'
//       });
//       const objectModel = await cocoSsd.load();

//       const detectFeatures = async () => {
//         if (videoRef && videoRef.readyState === 4) {
//           const faces = await faceModel.estimateFaces(videoRef);
//           const objects = await objectModel.detect(videoRef);

//           setFacesDetected(faces.length);
//           setObjectsDetected(objects);

//           if (faces.length === 0) {
//             setNoFaceDetected(true);
//           } else {
//             setNoFaceDetected(false);
//           }

//           // Simple logic to determine "looking away"
//           faces.forEach(face => {
//             const leftEye = face.keypoints.find(k => k.name === 'leftEye');
//             const rightEye = face.keypoints.find(k => k.name === 'rightEye');
//             if (leftEye && rightEye) {
//               const faceCenterX = (leftEye.x + rightEye.x) / 2;
//               const videoCenterX = videoRef.width / 2;
//               if (Math.abs(faceCenterX - videoCenterX) > videoRef.width * 0.2) {
//                 setLookingAway(true);
//               } else {
//                 setLookingAway(false);
//               }
//             }
//           });

//           if (canvasRef.current) {
//             const ctx = canvasRef.current.getContext('2d');
//             ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);

//             faces.forEach(face => {
//               ctx!.beginPath();
//               ctx!.rect(
//                 face.box.xMin,
//                 face.box.yMin,
//                 face.box.width,
//                 face.box.height
//               );
//               ctx!.stroke();
//             });

//             objects.forEach(object => {
//               ctx!.beginPath();
//               ctx!.rect(object.bbox[0], object.bbox[1], object.bbox[2], object.bbox[3]);
//               ctx!.stroke();
//             });
//           }
//         }
//       };

//       setInterval(detectFeatures, 100);
//     };

//     runFaceDetection();
//   }, [videoRef]);

//   return (
//     <div>
//       <canvas ref={canvasRef} width="640" height="480" />
//       <div>
//         <p>Faces Detected: {facesDetected}</p>
//         <p>No Face Detected: {noFaceDetected ? 'Yes' : 'No'}</p>
//         <p>Looking Away: {lookingAway ? 'Yes' : 'No'}</p>
//         <p>Objects Detected: {objectsDetected.map(obj => obj.class).join(', ')}</p>
//         {/* Placeholder for voice detection */}
//         <p>Headphones Detected: {headphonesDetected ? 'Yes' : 'No'}</p>
//       </div>
//     </div>
//   );
// };

// export default FaceDetectionComponent;

// LAST IMPLEMNENTATION 
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
  const [longInactivity, setLongInactivity] = useState(false);
  const [lipMovement, setLipMovement] = useState(false);
  const [unusualLighting, setUnusualLighting] = useState(false);

  const lastFaceDetectionTimeRef = useRef<number>(Date.now());
  const lastLipPositionRef = useRef<{ x: number, y: number } | null>(null);
  const initialLightingRef = useRef<number | null>(null);

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
      // Load your custom model for headphones detection
      // const customModel = await tf.loadGraphModel('/path/to/headphone-detection-model/model.json');

      const detectFeatures = async () => {
        if (videoRef && videoRef.readyState === 4) {
          const faces = await faceModel.estimateFaces(videoRef);
          const objects = await objectModel.detect(videoRef);

          // Update state with the number of faces detected
          setFacesDetected(faces.length);
          setObjectsDetected(objects);

          // Check if no face is detected
          if (faces.length === 0) {
            setNoFaceDetected(true);
          } else {
            setNoFaceDetected(false);
          }

          // Simple logic to determine "looking away"
          faces.forEach(face => {
            const leftEye = face.keypoints.find(k => k.name === 'leftEye');
            const rightEye = face.keypoints.find(k => k.name === 'rightEye');
            const nose = face.keypoints.find(k => k.name === 'nose');
            const mouthLeft = face.keypoints.find(k => k.name === 'mouthLeft');
            const mouthRight = face.keypoints.find(k => k.name === 'mouthRight');

            if (leftEye && rightEye && nose) {
              const faceCenterX = (leftEye.x + rightEye.x) / 2;
              const eyeDistance = Math.abs(leftEye.x - rightEye.x);
              const noseDistanceFromCenter = Math.abs(nose.x - faceCenterX);

              if (noseDistanceFromCenter > eyeDistance * 0.2) { // Stricter threshold
                setLookingAway(true);
              } else {
                setLookingAway(false);
              }

              // Lip movement detection
              if (mouthLeft && mouthRight) {
                const lipPosition = { x: (mouthLeft.x + mouthRight.x) / 2, y: (mouthLeft.y + mouthRight.y) / 2 };
                if (lastLipPositionRef.current) {
                  const lipMovementDistance = Math.sqrt(
                    Math.pow(lipPosition.x - lastLipPositionRef.current.x, 2) +
                    Math.pow(lipPosition.y - lastLipPositionRef.current.y, 2)
                  );
                  if (lipMovementDistance > 1) { // Stricter threshold
                    setLipMovement(true);
                  } else {
                    setLipMovement(false);
                  }
                }
                lastLipPositionRef.current = lipPosition;
              }
            }
          });

          // Detect headphones/earphones using the custom model
          // const customPredictions = await customModel.executeAsync(tf.browser.fromPixels(videoRef));

          // Process custom model predictions (this is a placeholder; the actual processing will depend on your model)
          // Assuming the custom model outputs bounding boxes similar to coco-ssd
          // const customObjects = customPredictions[0].arraySync();

          // // Update state based on custom model detections
          // const headphonesFound = customObjects.some(obj => obj.class === 'headphone' || obj.class === 'earphone');
          // setHeadphonesDetected(headphonesFound);

          // Long inactivity detection
          if (faces.length > 0) {
            lastFaceDetectionTimeRef.current = Date.now();
            setLongInactivity(false);
          } else {
            if (Date.now() - lastFaceDetectionTimeRef.current > 60000) { // 1 minute of inactivity
              setLongInactivity(true);
            }
          }

          // Unusual lighting detection
          const imageTensor = tf.browser.fromPixels(videoRef);
          const brightness = imageTensor.mean().dataSync()[0];
          if (initialLightingRef.current === null) {
            initialLightingRef.current = brightness;
          } else {
            if (Math.abs(brightness - initialLightingRef.current) > 30) {
              setUnusualLighting(true);
            } else {
              setUnusualLighting(false);
            }
          }

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

            // customObjects.forEach(obj => {
            //   ctx!.beginPath();
            //   ctx!.rect(obj.bbox[0], obj.bbox[1], obj.bbox[2], obj.bbox[3]);
            //   ctx!.stroke();
            // });
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
        <p>Voice Detected: {voiceDetected ? 'Yes' : 'No'}</p>
        <p>Headphones Detected: {headphonesDetected ? 'Yes' : 'No'}</p>
        <p>Long Inactivity: {longInactivity ? 'Yes' : 'No'}</p>
        <p>Lip Movement: {lipMovement ? 'Yes' : 'No'}</p>
        <p>Unusual Lighting: {unusualLighting ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default FaceDetectionComponent;
