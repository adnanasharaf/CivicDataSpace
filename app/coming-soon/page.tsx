import Link from "next/link";

const ICONS: Record<string, string> = {
  Sectors: "🏭",
  "Use Cases": "💡",
  Publishers: "📦",
  "About Us": "🌐",
};

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const label = page ?? "This Page";
  const icon = ICONS[label] ?? "🚧";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-7xl mb-6">{icon}</div>
      <h1 className="text-3xl font-extrabold text-[#1a3a5c] dark:text-[#84DCCF]">
        {label}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md text-sm">
        We're working hard to bring this section to life. Check back soon!
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
