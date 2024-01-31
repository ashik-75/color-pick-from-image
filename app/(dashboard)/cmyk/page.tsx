"use client";
import { ImageColorPicker } from "react-image-color-picker";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import { cmykToRgb, objToRgb, rgbToCmyk } from "@/lib/converter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ImageUploadForm from "../_components/image-upload";
import CmykColorWithSlider from "../_components/cmyk-color-with-slider copy";

const Page = () => {
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState(1);
  const [color1, setColor1] = useState({ c: 0, m: 0, y: 0, k: 0 });
  const [color2, setColor2] = useState({ c: 0, m: 0, y: 0, k: 0 });
  const [final, setFinal] = useState({ c: 0, m: 0, y: 0, k: 0 });

  const handleColorPick = (color: string) => {
    if (selected === 1) {
      setColor1(rgbToCmyk(color));
    }

    if (selected === 2) {
      setColor2(rgbToCmyk(color));
    }
  };

  const handleImage = (url: string) => setImage(url);

  const finaCMYK = () => {
    const c = Math.abs(color1.c - color2.c);
    const m = Math.abs(color1.m - color2.m);
    const y = Math.abs(color1.y - color2.y);
    const k = Math.abs(color1.k - color2.k);

    return {
      c,
      m,
      y,
      k,
    };
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(JSON.stringify(finaCMYK()));
    toast.success("CMYK color copied");
  };

  const targetBg = () => {
    return objToRgb(cmykToRgb(color1.c, color1.m, color1.y, color1.k));
  };

  const currentBg = () => {
    return objToRgb(cmykToRgb(color2.c, color2.m, color2.y, color2.k));
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

      {/* calculation part ipp*/}
      {image && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Target div */}
          <div>
            <div
              onClick={() => setSelected(1)}
              style={{
                padding: "20px",
                background: `${targetBg()}`,
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
                RGB: <div>{targetBg()}</div>
              </div>
              <div className="flex gap-2">CMYK: {JSON.stringify(color1)}</div>

              <div className="space-y-4">
                <CmykColorWithSlider
                  field="c"
                  value={color1.c}
                  setColorValue={setColor1}
                />
                <CmykColorWithSlider
                  field="m"
                  value={color1.m}
                  setColorValue={setColor1}
                />
                <CmykColorWithSlider
                  field="y"
                  value={color1.y}
                  setColorValue={setColor1}
                />
                <CmykColorWithSlider
                  field="k"
                  value={color1.k}
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
                background: `${currentBg()}`,
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
                RGB: <div>{JSON.stringify(currentBg())}</div>
              </div>
              <div className="flex gap-2">
                CMYK: <pre></pre> {JSON.stringify(color2)}
              </div>

              <div className="space-y-4">
                <CmykColorWithSlider
                  field="c"
                  value={color2.c}
                  setColorValue={setColor2}
                />
                <CmykColorWithSlider
                  field="m"
                  value={color2.m}
                  setColorValue={setColor2}
                />
                <CmykColorWithSlider
                  field="y"
                  value={color2.y}
                  setColorValue={setColor2}
                />
                <CmykColorWithSlider
                  field="k"
                  value={color2.k}
                  setColorValue={setColor2}
                />
              </div>
            </div>
          </div>

          {/* 3rd output */}
          <div>
            <div
              style={{
                padding: "20px",
              }}
              className={cn("hidden w-full cursor-pointer rounded-md border")}
            >
              Needed
            </div>

            <div className="space-y-2">
              <div className="flex gap-5">
                RGB:{" "}
                <div>
                  {JSON.stringify(
                    cmykToRgb(color2.c, color2.m, color2.y, color2.k),
                  )}
                </div>
              </div>
              <div className="">
                <div className="flex gap-2">
                  CMYK: <pre></pre> {JSON.stringify(finaCMYK())}
                </div>
              </div>

              <div>
                <div>
                  C: <span>{finaCMYK().c}%</span>
                </div>
                <div>
                  M: <span>{finaCMYK().m}%</span>
                </div>
                <div>
                  Y: <span>{finaCMYK().y}%</span>
                </div>
                <div>
                  K: <span>{finaCMYK().k}%</span>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
