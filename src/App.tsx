import { useRef, useState } from "react";
import { Dropzone } from "./components/Dropzone";
import { FileList } from "./components/FileList";
import { MergeButton } from "./components/MergeButton";
import { Navbar } from "./components/Navbar";
import { generateFileId } from "./utils/generateFileId";

type FileItem = {
  id: string;
  file: File;
};

export default function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const addFiles = (selectedFiles: FileList) => {
    const existingFileNames = new Set(files.map((f) => f.file.name));
    const fileArray = Array.from(selectedFiles)
      .filter((file) => !existingFileNames.has(file.name))
      .map((file) => ({ id: generateFileId(), file }));

    setFiles((prev) => prev.concat(fileArray));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const mergePdfs = async () => {
    setIsMerging(true);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();

      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = await pdfDoc.getPages();

        for (let i = 0; i < pages.length; i++) {
          const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [i]);
          mergedPdf.addPage(copiedPage);
        }
      }

      const mergedPdfBytes = await mergedPdf.save();
      const mergedPdfBlob = new Blob([mergedPdfBytes], {
        type: "application/pdf",
      });
      const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = mergedPdfUrl;
        downloadLinkRef.current.click();
      }
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs. Please try again.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Dropzone
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
        />
        {files.length > 0 && (
          <FileList files={files} setFiles={setFiles} removeFile={removeFile} />
        )}
        {files.length > 1 && (
          <MergeButton
            isMerging={isMerging}
            mergePdfs={mergePdfs}
            disabled={isMerging}
          />
        )}
        <a
          className="hidden"
          href="#/"
          ref={downloadLinkRef}
          download="merged.pdf"
        >
          Download
        </a>
      </main>
    </div>
  );
}
