import { useEffect, useRef } from "react";

const AppleEyeReflection = () => {
  const videoRefLeft = useRef(null);
  const videoRefRight = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRefLeft.current) videoRefLeft.current.srcObject = stream;
        if (videoRefRight.current) videoRefRight.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Camera access error:", err);
      });

    return () => {
      if (videoRefLeft.current?.srcObject) {
        videoRefLeft.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

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
