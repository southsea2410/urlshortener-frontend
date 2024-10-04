import ReactTable from "@/components/molecules/ReactTable";
import useGetShortenedUrls from "@/services/useGetShortenedUrls";
import useAliasStore from "@/store/useUrlStore";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/molecules/Header";
import useColumnDef from "@/hooks/useColumnDef";
import QRPopover from "@/components/molecules/QRDialog";

export const Route = createFileRoute("/myurls")({
  component: MyUrls,
});

function MyUrls() {
  const { aliases } = useAliasStore();

  const { data: myUrls, ...fetchProps } = useGetShortenedUrls(
    { aliases },
    {
      enabled: aliases.length > 0,
    },
  );

  const { columns, urlQr, openQr, setOpenQr } = useColumnDef();

  return (
    <main>
      <Header title="My URLs" />
      <hr className="mb-10" />
      {fetchProps.isLoading && <p>Loading...</p>}
      <div className="px-8">
        {myUrls && (
          <ReactTable
            columns={columns}
            data={myUrls}
            sorting={[{ id: "createdAt", desc: true }]}
          />
        )}
      </div>
      <QRPopover url={urlQr} open={openQr} setOpen={setOpenQr} />
    </main>
  );
}
