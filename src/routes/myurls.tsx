import { ExternalLink, PieChart } from "lucide-react";
import { useMemo } from "react";

import Header from "@/components/molecules/Header";
import ReactTable from "@/components/molecules/ReactTable";
import { Button } from "@/components/ui/button";
import { baseBackendUrl } from "@/services/apis";
import { Url } from "@/services/types";
import useGetShortenedUrls from "@/services/useGetShortenedUrls";
import useAliasStore from "@/store/useUrlStore";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export const Route = createFileRoute("/myurls")({
  component: MyUrls,
});

export default function MyUrls() {
  const { aliases } = useAliasStore();

  const { data: myUrls, ...fetchProps } = useGetShortenedUrls(
    { aliases },
    {
      enabled: aliases.length > 0,
    },
  );

  console.log(aliases);

  // const columns = createColumnHelper<Url>();

  const columns = useMemo<ColumnDef<Url, any>[]>(
    () => [
      {
        header: "Long URL",
        size: 300,
        accessorKey: "longUrl",
      },
      {
        header: "Alias",
        accessorKey: "alias",
        cell(props) {
          return (
            <a
              target="_blank"
              className="flex items-center gap-0.5 text-blue-500 underline decoration-blue-300"
              href={baseBackendUrl + props.getValue()}
            >
              {props.getValue()}
              <ExternalLink size={20} />
            </a>
          );
        },
      },
      {
        header: "QR code",
        cell: () => (
          <div>
            <a>Show</a>
          </div>
        ),
      },
      {
        header: "Password",
        accessorKey: "password",
        size: 100,
        enableColumnFilter: false,
        cell(props) {
          if (props.getValue()) {
            return <p className="text-slate-700">Yes</p>;
          } else return <p className="text-slate-400">No</p>;
        },
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell(props) {
          const date = new Date(props.getValue());
          return <p>{date.toDateString()}</p>;
        },
      },
      {
        header: "Expiry",
        accessorKey: "expiry",
        cell(props) {
          if (!props.getValue()) {
            return <p>Never</p>;
          }
          const date = new Date(props.getValue());
          return <p>{date.toDateString()}</p>;
        },
      },
      {
        header: "Analytics",
        meta: {
          align: "center",
        },
        size: 100,
        cell(props) {
          return (
            <div className="w-full">
              <div className="mx-auto w-fit">
                <Button size="icon" variant="ghost" asChild>
                  <a href={"/analytics/" + props.row.original.alias}>
                    <PieChart />
                  </a>
                </Button>
              </div>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <main>
      <Header />
      <hr className="mb-10" />
      {fetchProps.isLoading && <p>Loading...</p>}
      <div className="px-8">
        {myUrls && <ReactTable columns={columns} data={myUrls} />}
      </div>
    </main>
  );
}
