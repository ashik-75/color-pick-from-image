"use client";
import { ImageColorPicker } from "react-image-color-picker";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import ImageUploadForm from "./_components/image-upload";
import { RGBTORYB, RYBTORGB } from "@/lib/converter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ColorWithSlider from "./_components/color-with-slider";

const Page = () => {
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState(1);
  const [color1, setColor1] = useState({ r: 0, y: 0, b: 0 });
  const [color2, setColor2] = useState({ r: 0, y: 0, b: 0 });
  const [final, setFinal] = useState({ r: 0, y: 0, b: 0 });

  const handleColorPick = (color: string) => {
    if (selected === 1) {
      setColor1(RGBTORYB(color));
    }

    if (selected === 2) {
      setColor2(RGBTORYB(color));
    }
  };

  const handleImage = (url: string) => setImage(url);

  const R1 = Math.ceil((color1.r / 255) * 100);
  const Y1 = Math.ceil((color1.y / 255) * 100);
  const B1 = Math.ceil((color1.b / 255) * 100);

  const R2 = Math.ceil((color2.r / 255) * 100);
  const Y2 = Math.ceil((color2.y / 255) * 100);
  const B2 = Math.ceil((color2.b / 255) * 100);

  const finalRYB = () => {
    const r = Math.abs(color1.r - color2.r);
    const y = Math.abs(color1.y - color2.y);
    const b = Math.abs(color1.b - color2.b);

    return {
      r,
      y,
      b,
    };
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(JSON.stringify(finalRYB()));
    toast.success("RYB color copied");
  };
  return (
    <div className=" mx-auto h-full max-w-5xl space-y-5 ">
      <div className="mx-auto max-w-md">
        {!image && <ImageUploadForm handleImage={handleImage} />}
      </div>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl">
        {image && (
          <ImageColorPicker
            onColorPick={handleColorPick}
            imgSrc={image}
            zoom={1}
          />
        )}
      </div>

      {image && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Target div */}
          <div>
            <div
              onClick={() => setSelected(1)}
              style={{
                padding: "20px",
                background: `${RYBTORGB(color1)}`,
              }}
              className={cn(
                "w-full cursor-pointer rounded-md border",
                selected === 1 && "border-2 border-pink-600",
              )}
            >
              Target
            </div>

            <div>
              <div className="flex gap-5">
                RGB: <div>{RYBTORGB(color1)}</div>
              </div>
              <div className="flex gap-2">
                RYB: <pre></pre> {JSON.stringify(color1)}
              </div>

              <div className="space-y-4">
                <ColorWithSlider
                  field="r"
                  value={R1}
                  setColorValue={setColor1}
                />
                <ColorWithSlider
                  field="y"
                  value={Y1}
                  setColorValue={setColor1}
                />
                <ColorWithSlider
                  field="b"
                  value={B1}
                  setColorValue={setColor1}
                />
              </div>
            </div>
          </div>

          {/* current div */}
          <div>
            <div
              onClick={() => setSelected(2)}
              style={{
                padding: "20px",
                background: `${RYBTORGB(color2)}`,
              }}
              className={cn(
                "w-full cursor-pointer rounded-md border",
                selected === 2 && "border-2 border-rose-600",
              )}
            >
              Current
            </div>

            <div>
              <div className="flex gap-5">
                RGB: <div>{RYBTORGB(color2)}</div>
              </div>
              <div className="flex gap-2">
                RYB: <pre></pre> {JSON.stringify(color2)}
              </div>

              <div className="space-y-4">
                <ColorWithSlider
                  field="r"
                  value={R2}
                  setColorValue={setColor2}
                />
                <ColorWithSlider
                  field="y"
                  value={Y2}
                  setColorValue={setColor2}
                />
                <ColorWithSlider
                  field="b"
                  value={B2}
                  setColorValue={setColor2}
                />
              </div>
            </div>
          </div>

          {/* 3rd */}
          <div>
            <div
              style={{
                padding: "20px",
                background: `${RYBTORGB(finalRYB())}`,
              }}
              className={cn("hidden w-full cursor-pointer rounded-md border")}
            >
              Needed
            </div>

            <div className="py-[35px]"></div>

            {color1 && (
              <div className="space-y-2">
                <div className="flex gap-5">
                  RGB: <div>{RYBTORGB(finalRYB())}</div>
                </div>
                <div className="">
                  <div className="flex gap-2">
                    RYB: <pre></pre> {JSON.stringify(finalRYB())}
                  </div>
                </div>

                <div>
                  <div>
                    R: <span>{Math.abs(R1 - R2)}%</span>
                  </div>
                  <div>
                    Y: <span>{Math.abs(Y1 - Y2)}%</span>
                  </div>
                  <div>
                    B: <span>{Math.abs(B1 - B2)}%</span>
                  </div>
                </div>

                <Button
                  size={"sm"}
                  variant={"secondary"}
                  onClick={handleCopyColor}
                >
                  <Copy size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
