"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ImageColorPicker } from "react-image-color-picker";
import { Copy, RocketIcon } from "lucide-react";
import React, { useState } from "react";
import ImageUploadForm from "./_components/image-upload";
import Image from "next/image";
import ColorRange from "./_components/color-range";
import { RGBTORYB, RYBTORGB } from "@/lib/converter";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Page = () => {
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState(1);
  const [color1, setColor1] = useState({ r: 0, y: 0, b: 0 });
  const [color2, setColor2] = useState({ r: 0, y: 0, b: 0 });

  const handleColorPick = (color: string) => {
    if (selected === 1) {
      setColor1(RGBTORYB(color));
    }

    if (selected === 2) {
      setColor2(RGBTORYB(color));
    }
  };

  const handleImage = (url: string) => setImage(url);

  const R1 = Math.round((color1.r / 255) * 100);
  const Y1 = Math.round((color1.y / 255) * 100);
  const B1 = Math.round((color1.b / 255) * 100);

  const R2 = Math.round((color2.r / 255) * 100);
  const Y2 = Math.round((color2.y / 255) * 100);
  const B2 = Math.round((color2.b / 255) * 100);

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

      {/* calculation part */}
      {image && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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

            {color1 && (
              <div>
                <div className="flex gap-5">
                  RGB: <div>{RYBTORGB(color1)}</div>
                </div>
                <div className="">
                  <div className="flex gap-2">
                    RYB: <pre></pre> {JSON.stringify(color1)}
                  </div>
                  <br />
                  <div>
                    <div className="flex items-center gap-2">
                      <span>R</span>{" "}
                      <div className="flex-1">
                        <Slider
                          defaultValue={[R1]}
                          onValueChange={(v) =>
                            setColor1((prev) => ({
                              ...prev,
                              r: Math.ceil((v[0] / 100) * 255),
                            }))
                          }
                        />
                      </div>
                      <span className="w-5">{R1}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Y</span>{" "}
                      <div className="flex-1">
                        <Slider
                          defaultValue={[Y1]}
                          onValueChange={(v) =>
                            setColor1((prev) => ({
                              ...prev,
                              y: Math.ceil((v[0] / 100) * 255),
                            }))
                          }
                        />
                      </div>
                      <span className="w-5">{Y1}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>B</span>{" "}
                      <div className="flex-1">
                        <Slider
                          defaultValue={[B1]}
                          onValueChange={(v) =>
                            setColor1((prev) => ({
                              ...prev,
                              b: Math.ceil((v[0] / 100) * 255),
                            }))
                          }
                        />
                      </div>
                      <span className="w-5">{B1}%</span>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            )}
          </div>

          {/* 2nd */}
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

            {color2 && (
              <div>
                <div className="flex gap-5">
                  RGB: <div>{RYBTORGB(color2)}</div>
                </div>
                <div className="">
                  <div className="flex gap-2">
                    RYB: <pre></pre> {JSON.stringify(color2)}
                  </div>
                  <br />
                  <div>
                    <div className="flex items-center gap-2">
                      <span>R</span>{" "}
                      <div className="flex-1">
                        <Slider
                          defaultValue={[R2]}
                          onValueChange={(v) =>
                            setColor2((prev) => ({
                              ...prev,
                              r: Math.ceil((v[0] / 100) * 255),
                            }))
                          }
                        />
                      </div>
                      <span className="w-5">{R2}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Y</span>{" "}
                      <div className="flex-1">
                        <Slider
                          defaultValue={[Y2]}
                          onValueChange={(v) =>
                            setColor2((prev) => ({
                              ...prev,
                              y: Math.ceil((v[0] / 100) * 255),
                            }))
                          }
                        />
                      </div>
                      <span className="w-5">{Y2}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>B</span>{" "}
                      <div className="flex-1">
                        <Slider
                          defaultValue={[B2]}
                          onValueChange={(v) =>
                            setColor2((prev) => ({
                              ...prev,
                              b: Math.ceil((v[0] / 100) * 255),
                            }))
                          }
                        />
                      </div>
                      <span className="w-5">{B2}%</span>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            )}
          </div>

          {/* 3rd */}
          <div>
            <div
              style={{
                padding: "20px",
                background: `${RYBTORGB(finalRYB())}`,
              }}
              className={cn("w-full cursor-pointer rounded-md border")}
            >
              Needed
            </div>

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
