import { useEffect, useRef, useState } from "react";

const AppleEyeReflection = ({ currentPage }) => {
  const videoRefLeft = useRef(null);
  const videoRefRight = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Turn ON camera when currentPage >= 77
    if (currentPage >= 77 && !stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRefLeft.current) videoRefLeft.current.srcObject = mediaStream;
          if (videoRefRight.current) videoRefRight.current.srcObject = mediaStream;
        })
        .catch((err) => {
          console.error("Camera access error:", err);
        });
    }

    // Turn OFF camera when going back below 77
    if (currentPage < 77 && stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    // Clean up on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentPage, stream]);
  // Don't render video or image before page 77
  if (currentPage < 77) return null;
  return (
    <div className="relative w-full h-full">
      {/* Full-screen background image */}
      <img
        src="/book-pages/appleofeye.png"
        alt="Apple Eye Background"
        className="absolute inset-0 w-full h-full object-cover z-20"
      />

      {/* Left eye */}
      <video
        ref={videoRefLeft}
        autoPlay
        muted
        playsInline
        className="absolute w-[70px] h-[50px] object-cover border-2 border-white z-10"
        style={{
          left: "18%",
          top: "43%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50% / 40%", // squash shape
        }}
      />

      {/* Right eye */}
      <video
        ref={videoRefRight}
        autoPlay
        muted
        playsInline
        className="absolute w-[70px] h-[50px] object-cover border-2 border-white z-10"
        style={{
          left: "53%",
          top: "43%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50% / 40%", // squash shape
        }}
      />
    </div>
  );
};

export default AppleEyeReflection;
