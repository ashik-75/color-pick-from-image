import { Slider } from "@/components/ui/slider";
import React from "react";

type CmykColorWithSliderProps = {
  value: number;
  field: "c" | "m" | "y" | "k";
  setColorValue: React.Dispatch<
    React.SetStateAction<{
      c: number;
      m: number;
      y: number;
      k: number;
    }>
  >;
};

function CmykColorWithSlider({
  value,
  setColorValue,
  field,
}: CmykColorWithSliderProps) {
  return (
    <div className="flex items-center gap-2">
      <span>{field.toUpperCase()}</span>{" "}
      <div className="flex-1">
        <Slider
          value={[value]}
          onValueChange={(v) =>
            setColorValue((prev) => ({
              ...prev,
              [field]: Math.floor(v[0]),
            }))
          }
        />
      </div>
      <div className="flex rounded-xl border p-2">
        <input
          value={value}
          max={100}
          min={0}
          className="w-10 border-none outline-none"
          onChange={(e) => {
            const value = Number(e.target.value);

            setColorValue((prev) => ({
              ...prev,
              [field]: Math.floor(value),
            }));
          }}
          type="number"
        />
        <span>%</span>
      </div>
    </div>
  );
}

export default CmykColorWithSlider;
