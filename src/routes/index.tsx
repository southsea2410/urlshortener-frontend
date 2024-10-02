import { Accordion, Button } from "flowbite-react";
import React from "react";

import { createFileRoute } from "@tanstack/react-router";

import Header from "../components/molecules/Header";
import useShortenUrl from "../services/useShortenUrl";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { mutate: shortenUrl } = useShortenUrl();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

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
    <main className="h-screen">
      <Header />
      <div className="flex h-full flex-col items-center justify-center">
        <form
          className="flex w-[500px] flex-col rounded-lg pb-2 max-md:max-w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-3 flex w-full items-center rounded-lg border border-solid border-gray-700 px-6 py-6 shadow-[0px_4px_10px_rgba(0,0,0,0.1)] max-md:max-w-full max-md:px-5">
            <label htmlFor="longUrl" className="sr-only">
              Enter the link here
            </label>
            <input
              id="longUrl"
              name="longUrl"
              type="url"
              placeholder="Enter the link here"
              className="font-md flex-grow border-none bg-transparent text-xl font-light leading-snug text-gray-700 outline-none"
              aria-label="Enter the link here"
            />
          </div>
          <Accordion className="mb-3">
            <Accordion.Panel>
              <Accordion.Title>Advanced Options</Accordion.Title>
              <Accordion.Content className="space-y-2.5">
                <div>
                  <label htmlFor="alias" className="sr-only">
                    Alias
                  </label>
                  <input
                    id="alias"
                    name="alias"
                    type="text"
                    placeholder="Alias"
                    aria-label="Alias"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                  />
                </div>
                <div>
                  <label htmlFor="expiry" className="sr-only">
                    Expiry Date
                  </label>
                  <input
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
          <Button type="submit">Shorten Now!</Button>
        </form>
        <div className="h-[200px]" />
      </div>
    </main>
  );
}
