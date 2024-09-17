import { Bars3Icon, TrashIcon } from "@heroicons/react/24/solid";
import { ReactSortable as Sortable } from "react-sortablejs";
import { classNames } from "../utils/classNames";

type FileItem = {
  id: string;
  file: File;
};

type FileListProps = {
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
  removeFile: (id: string) => void;
};

export function FileList({ files, setFiles, removeFile }: FileListProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Uploaded PDFs</h2>
      <Sortable animation={150} tag="ul" list={files} setList={setFiles}>
        {files.map((item, index) => (
          <li
            key={item.id}
            className={classNames(
              "flex items-center",
              "py-1 sm:py-2 border-b bg-white rounded-md shadow-sm px-2 sm:px-3 mb-2",
            )}
          >
            <Bars3Icon className="text-gray-500 w-6 h-6 mr-3 cursor-grab sm:w-8 sm:h-8" />
            <span className="flex-1 text-sm text-gray-700 sm:text-base">
              {index + 1}. {item.file.name}
            </span>
            <button
              type="button"
              onClick={() => removeFile(item.id)}
              className="ml-3 text-red-600 hover:text-red-800"
            >
              <TrashIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </li>
        ))}
      </Sortable>
    </div>
  );
}
