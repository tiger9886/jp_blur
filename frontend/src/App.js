import React, { useRef, useState } from "react";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Bắt webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  // Chụp hình
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Camera Capture Demo</h1>
      <video ref={videoRef} style={{ width: "400px", border: "1px solid black" }} />
      <div style={{ marginTop: "20px" }}>
        <button onClick={startCamera} style={{ marginRight: "10px" }}>
          Start Camera
        </button>
        <button onClick={takePhoto}>Take Photo</button>
      </div>

      {/* Hiển thị ảnh chụp */}
      {capturedImage && (
        <div style={{ marginTop: "20px" }}>
          <h2>Captured Image:</h2>
          <img src={capturedImage} alt="Captured" style={{ width: "400px" }} />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default App;
