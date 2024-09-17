import { classNames } from "../utils/classNames";

type MergeButtonProps = {
  isMerging: boolean;
  mergePdfs: () => void;
  disabled: boolean;
};

export function MergeButton({
  isMerging,
  mergePdfs,
  disabled,
}: MergeButtonProps) {
  return (
    <button
      type="button"
      onClick={mergePdfs}
      className={classNames(
        "mt-4 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
        isMerging && "opacity-50 cursor-not-allowed",
      )}
      disabled={disabled}
    >
      {isMerging ? "Merging..." : "Merge PDFs"}
    </button>
  );
}
