import AnalyticsHeader from "@/components/molecules/AnalyticsHeader";
import MetabaseFrame from "@/components/molecules/MetabaseFrame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/analytics/$alias")({
  component: AliasAnalytics,
});

function AliasAnalytics() {
  const { alias } = Route.useParams();

  return (
    <main className="flex h-screen flex-col">
      <AnalyticsHeader title="Analytics" />
      <hr />
      <div className="relative w-full grow px-8">
        {alias && (
          <MetabaseFrame
            payload={{ resource: { dashboard: 2 }, params: { alias: [alias] } }}
          />
        )}
      </div>
    </main>
  );
}
