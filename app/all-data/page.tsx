import DatasetListing from "@/src/components/DatasetListing";

export const metadata = {
  title: "All Data — CivicDataSpace",
  description: "Browse and discover all civic datasets.",
};

export default function AllDataPage() {
  return <DatasetListing />;
}
