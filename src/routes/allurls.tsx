import Header from "@/components/molecules/Header";
import ReactTable from "@/components/molecules/ReactTable";
import { createFileRoute } from "@tanstack/react-router";
import useGetAllShortenedUrls from "@/services/useGetAllShortenedUrls";
import useColumnDef from "@/hooks/useColumnDef";

export const Route = createFileRoute("/allurls")({
  component: AllUrls,
});

function AllUrls() {
  const { data: allUrls, ...fetchProps } = useGetAllShortenedUrls();

  const columns = useColumnDef();

  return (
    <main>
      <Header title="All URLs" />
      <hr className="mb-10" />
      {fetchProps.isLoading && <p>Loading...</p>}
      <div className="px-8">
        {allUrls && (
          <ReactTable
            columns={columns}
            data={allUrls}
            sorting={[{ id: "createdAt", desc: true }]}
          />
        )}
      </div>
    </main>
  );
}
