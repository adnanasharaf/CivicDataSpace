import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-[120px] font-extrabold leading-none text-[#1a3a5c] dark:text-[#84DCCF] select-none">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md">
        The page you're looking for doesn't exist or hasn't been built yet.
      </p>
      <div className="flex items-center gap-3 mt-8">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-[#1a3a5c] text-white text-sm font-semibold hover:bg-[#152f4e] transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/all-data"
          className="px-5 py-2.5 rounded-lg bg-[#84DCCF] text-[#11181C] text-sm font-semibold hover:bg-[#6fcbbf] transition-colors"
        >
          Browse Datasets
        </Link>
      </div>
    </div>
  );
}
