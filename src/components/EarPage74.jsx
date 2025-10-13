import { useContext } from "react";
import { EarContext } from "./EarContext";  // ✅ Correct import

const ears = [
  { id: 23, src: "/ears/Layer 23.png" },
  { id: 22, src: "/ears/Layer 22.png" },
  { id: 21, src: "/ears/Layer 21.png" },
  { id: 18, src: "/ears/Layer 18.png" },
  { id: 19, src: "/ears/Layer 19.png" },
  { id: 20, src: "/ears/Layer 20.png" },
  { id: 17, src: "/ears/Layer 17.png" },
  { id: 16, src: "/ears/Layer 16.png" },
  { id: 15, src: "/ears/Layer 15.png" },
];

const EarPage74 = () => {
  const { setDraggingEar } = useContext(EarContext);

  const handleMouseDown = (e, ear, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggingEar({
      ...ear,
      index,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    });
  };

  const rows = [
    ears.slice(0, 3), // 1st row → 3 ears
    ears.slice(3, 7), // 2nd row → 4 ears
    ears.slice(7, 9), // 3rd row → 2 ears
  ];

  return (
    <div className="relative w-full h-full">
      {/* Background */}
      <img
        src="/ears/clean plate bg.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Ear grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-5 grid gap-y-10">
        {/* Row 1 → slightly left */}
        <div className="flex justify-start gap-8">
          {rows[0].map((ear, index) => (
            <img
              key={ear.id}
              src={ear.src}
              onMouseDown={(e) => handleMouseDown(e, ear, index)}
              className="w-10 h-auto cursor-grab active:cursor-grabbing"
              draggable={false}
            />
          ))}
        </div>

        {/* Row 2 → normal center */}
        <div className="flex justify-center gap-8">
          {rows[1].map((ear, index) => (
            <img
              key={ear.id}
              src={ear.src}
              onMouseDown={(e) => handleMouseDown(e, ear, index)}
              className="w-10 h-auto cursor-grab active:cursor-grabbing"
              draggable={false}
            />
          ))}
        </div>

        {/* Row 3 → wider gap */}
        <div className="flex justify-center gap-12">
          {rows[2].map((ear, index) => (
            <img
              key={ear.id}
              src={ear.src}
              onMouseDown={(e) => handleMouseDown(e, ear, index)}
              className="w-10 h-auto cursor-grab active:cursor-grabbing"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* Instruction image at bottom */}
      <div className="absolute bottom-15 left-1/2 -translate-x-1/2 z-30">
        <img
          src="/prompts/ears.png"
          alt="Tap and place"
          className="w-[110px] h-auto"
        />
      </div>
    </div>
  );
};

export default EarPage74;
