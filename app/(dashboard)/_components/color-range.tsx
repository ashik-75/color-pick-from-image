import { Slider } from "@/components/ui/slider";
import { RGBTORYB } from "@/lib/converter";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const ColorRange = ({
  color,
  setSelected,
  setColor,
  box,
  label,
}: {
  color: string;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  box: number;
  label: string;
}) => {
  const [state, setState] = useState(RGBTORYB(color));

  const R = Math.round((state.r / 255) * 100);
  const Y = Math.round((state.y / 255) * 100);
  const B = Math.round((state.b / 255) * 100);

  return (
    <div>
      <div
        onClick={() => setSelected(box)}
        style={{ padding: "20px", background: color, width: "200px" }}
        className={cn(
          "cursor-pointer rounded-md border",
          box === 1 && "border-2 border-zinc-600",
        )}
      >
        {label}
      </div>

      {color && (
        <div>
          <div className="flex gap-5">
            RGB: <div>{color}</div>
          </div>
          <div className="">
            <div className="flex gap-2">
              RYB: <pre></pre> {JSON.stringify(RGBTORYB(color))}
            </div>
            <br />
            <div>
              <div className="flex items-center gap-2">
                <span>R</span>{" "}
                <div className="flex-1">
                  <Slider
                    defaultValue={[R]}
                    onValueChange={(v) => console.log({ v })}
                  />
                </div>
                <span className="w-5">{R}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Y</span>{" "}
                <div className="flex-1">
                  <Slider
                    defaultValue={[Y]}
                    onValueChange={(v) => console.log({ v })}
                  />
                </div>
                <span className="w-5">{Y}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>B</span>{" "}
                <div className="flex-1">
                  <Slider
                    defaultValue={[B]}
                    onValueChange={(v) => console.log({ v })}
                  />
                </div>
                <span className="w-5">{B}%</span>
              </div>
            </div>
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorRange;
