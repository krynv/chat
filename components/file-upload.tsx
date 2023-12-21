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