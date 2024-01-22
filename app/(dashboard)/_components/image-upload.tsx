"use client";

import React from "react";
import toast from "react-hot-toast";
import { FileUpload } from "@/components/file-uploade";

const ImageUploadForm = ({
  handleImage,
}: {
  handleImage: (url: string) => void;
}) => {
  return (
    <div className="space-y-2 rounded-lg bg-zinc-50 p-4">
      <div>
        <FileUpload
          endpoint="courseImage"
          onChange={(url) => {
            if (url) {
              console.log("FINAL_URL", url);
              // onSubmit({ imageUrl: url });
              handleImage(url);
              toast.success("successfully uploaded");
            } else {
              toast.error("Uploading error");
            }
          }}
        />
      </div>
    </div>
  );
};

export default ImageUploadForm;
