"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
  onChange, value, endpoint
}: FileUploadProps) => {

  const fileType = value?.split(".").pop();
  if (value && fileType && ["png", "jpg", "jpeg", "gif"].includes(fileType)) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Uploaded image"
          className="rounded-full"
        />
        {/* TODO: Add a way to remove the image from uploadthing's servers if user changes their mind*/}
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
}