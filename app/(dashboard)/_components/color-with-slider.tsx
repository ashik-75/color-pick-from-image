import { Slider } from "@/components/ui/slider";
import React from "react";

type ColorWithSliderProps = {
  value: number;
  field: "r" | "y" | "b";
  setColorValue: React.Dispatch<
    React.SetStateAction<{
      r: number;
      y: number;
      b: number;
    }>
  >;
};

function ColorWithSlider({
  value,
  setColorValue,
  field,
}: ColorWithSliderProps) {
  return (
    <div className="flex items-center gap-2">
      <span>{field.toUpperCase()}</span>{" "}
      <div className="flex-1">
        <Slider
          value={[value]}
          onValueChange={(v) =>
            setColorValue((prev) => ({
              ...prev,
              [field]: Math.ceil((v[0] / 100) * 255),
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
              [field]: Math.floor((value / 100) * 255),
            }));
          }}
          type="number"
        />
        <span>%</span>
      </div>
    </div>
  );
}

export default ColorWithSlider;
