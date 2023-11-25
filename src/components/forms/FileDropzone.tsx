import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadedFileProps } from "@/interfaces";
import { combineWithOr } from "@/utils";
import { X } from "lucide-react";
import { map, toLower } from "lodash";

interface DropzoneProps {
  onChange: ({ fileURL, uploadedFile }: UploadedFileProps) => void;
  className?: string;
  maxFileSize?: number;
  allowedFileExtensions?: string[];
  showPreview?: boolean;
}

export default function FileDropzone({
  onChange,
  className,
  maxFileSize = 5,
  allowedFileExtensions,
  showPreview,
}: DropzoneProps) {
  const fileInputRef = useRef<any>(null);
  const dropZoneCard = useRef<HTMLDivElement>(null);
  const [fileInfo, setFileInfo] = useState<{
    uploadedFile?: File;
    fileURL?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneCard.current?.classList.add("drag-over");
    setError(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneCard.current?.classList.remove("drag-over");
    const { files } = e.dataTransfer;
    handleFiles(files);
  };
  const handleDragLeave = () => {
    dropZoneCard.current?.classList.remove("drag-over");
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    setError(null);
    const uploadedFile = files[0];

    // Check file extension
    const [, fileExtension] = uploadedFile.type.split("/");
    if (
      allowedFileExtensions &&
      allowedFileExtensions.length &&
      !map(allowedFileExtensions, toLower).includes(fileExtension)
    ) {
      setError(
        `Invalid file type. Expected: .${combineWithOr(allowedFileExtensions)}`
      );
      return;
    }

    const uploadedFileSize = uploadedFile.size / (1024 * 1024);
    if (maxFileSize && uploadedFileSize > maxFileSize) {
      setError(
        `File size exceeds the maximum allowed size of ${maxFileSize} MB`
      );
      return;
    }
    const fileURL = URL.createObjectURL(uploadedFile);

    setFileInfo({
      uploadedFile: uploadedFile,
      fileURL: fileURL,
    });
    setError(null);
  };

  useEffect(() => {
    onChange(fileInfo);
  }, [fileInfo]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Card
        className={`min-h-[200px] flex items-center justify-center border-muted-foreground/50 border-dashed border-2 hover:border-muted-foreground/100 hover:cursor-pointer ${
          className ? className : ""
        }`}
        ref={dropZoneCard}
      >
        <CardContent
          className="flex flex-col items-center justify-center px-2 py-4 text-xs space-y-2"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="font-medium">Drag Files to Upload or</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-8 flex space-x-2 text-xs px-0 pl-1"
              onClick={handleButtonClick}
            >
              Click Here
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
          {fileInfo && Object.keys(fileInfo).length > 0 && (
            <p>{fileInfo.uploadedFile?.name}</p>
          )}
          {error && <span className="text-red-500">{error}</span>}
        </CardContent>
      </Card>

      <div className="my-10">
        {showPreview && fileInfo && fileInfo.fileURL && (
          <Card>
            <CardContent className="flex items-center justify-between py-2 px-4">
              <div className="w-[100px] h-20">
                <img
                  src={fileInfo.fileURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <Button className="rounded-sm" onClick={() => setFileInfo({})}>
                <X size={15} />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
