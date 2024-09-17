import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { classNames } from "../utils/classNames";

type DropzoneProps = {
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Dropzone({
  isDragging,
  setIsDragging,
  handleDrop,
  handleFileChange,
}: DropzoneProps) {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={classNames(
        "flex flex-col items-center justify-center text-gray-500",
        "w-full p-6 border-2 border-dashed rounded-md transition-colors",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
      )}
    >
      <ArrowDownTrayIcon className="w-12 h-12 mb-3" />
      <p className="text-center">
        Drag and drop PDF files here, or{" "}
        <label className="text-blue-500 underline cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="inline">browse</span>
        </label>{" "}
        to upload.
      </p>
    </div>
  );
}
