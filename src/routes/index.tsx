import { Accordion, Button } from "flowbite-react";
import React from "react";

import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/hooks/utils";
import { baseBackendUrl } from "@/services/apis";
import useAliasStore from "@/store/useUrlStore";
import { ToastAction } from "@radix-ui/react-toast";
import { createFileRoute } from "@tanstack/react-router";

import Header from "../components/molecules/Header";
import useShortenUrl from "../services/useShortenUrl";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { addAlias } = useAliasStore();

  const { mutate: shortenUrl } = useShortenUrl({
    onSuccess(data, _, __) {
      toast({
        title: "Shortened successfully",
        description: "Copy the link and share it with your friends",
        action: (
          <ToastAction
            onClick={() => copyToClipboard(baseBackendUrl + data)}
            altText="copy"
          >
            Copy
          </ToastAction>
        ),
      });

      addAlias(data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("longUrl"));

    const longUrl = data.get("longUrl") as string;
    const alias = (data.get("alias") as string) || undefined;
    const password = (data.get("password") as string) || undefined;
    const expiry = (data.get("expiry") as string) || undefined;

    shortenUrl({
      longUrl,
      alias,
      password,
      expiry,
    });
  };

  return (
    <main className="flex h-screen flex-col">
      <Header title="Nam URL Shortener" />
      <hr />
      <div className="flex grow flex-col items-center justify-center">
        <form
          className="flex w-[500px] flex-col rounded-lg pb-2 max-md:max-w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-3 flex w-full items-center rounded-lg border border-solid border-gray-700 px-6 py-6 shadow-[0px_4px_10px_rgba(0,0,0,0.1)] max-md:max-w-full max-md:px-5">
            <input
              autoComplete="off"
              id="longUrl"
              name="longUrl"
              type="url"
              placeholder="Enter the link here"
              className="font-md flex-grow border-none bg-transparent text-xl font-light leading-snug text-gray-700 outline-none"
              aria-label="Enter the link here"
              required
            />
          </div>
          <Accordion className="mb-3" collapseAll={true}>
            <Accordion.Panel>
              <Accordion.Title>Advanced Options</Accordion.Title>
              <Accordion.Content className="space-y-2.5">
                <div>
                  <Input
                    autoComplete="off"
                    id="alias"
                    name="alias"
                    type="text"
                    placeholder="Alias"
                    aria-label="Alias"
                  />
                </div>
                <div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                  />
                </div>
                <div>
                  <Input
                    id="expiry"
                    name="expiry"
                    type="date"
                    placeholder="Expiry Date"
                    aria-label="Expiry Date"
                  />
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <Button type="submit" size="lg">
            Shorten Now!
          </Button>
        </form>
        <div className="h-[200px]" />
      </div>
    </main>
  );
}
