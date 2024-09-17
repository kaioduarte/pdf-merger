import { MergeIcon } from "./MergeIcon";

export function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center text-white">
            <MergeIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="ml-2 text-lg sm:text-2xl font-bold">PDF Merger</h1>
          </div>
          <div />
        </div>
      </div>
    </nav>
  );
}
