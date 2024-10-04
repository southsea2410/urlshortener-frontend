import { ExternalLink, PieChart, ScanQrCode } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { baseBackendUrl } from "@/services/apis";
import { Url } from "@/services/types";
import { ColumnDef } from "@tanstack/react-table";

export default function useColumnDef() {
  const [openQr, setOpenQr] = useState(false);
  const [urlQr, setUrlQr] = useState("");

  const columns = useMemo<ColumnDef<Url, any>[]>(
    () => [
      {
        header: "Long URL",
        size: 400,
        accessorKey: "longUrl",
      },
      {
        header: "Alias",
        size: 300,
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
        cell: (props) => (
          <div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setOpenQr(true);
                setUrlQr(baseBackendUrl + props.row.original.alias);
              }}
            >
              <ScanQrCode className="mr-2" /> Show
            </Button>
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
            return <p className="text-slate-400">Never</p>;
          }
          const date = new Date(props.getValue());
          if (date < new Date()) {
            return <p className="text-red-600">{date.toDateString()}</p>;
          }
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
  return {
    columns,
    openQr,
    setOpenQr,
    urlQr,
    setUrlQr,
  };
}
