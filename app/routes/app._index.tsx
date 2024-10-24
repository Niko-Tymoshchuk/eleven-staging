import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({});
};

export default function HomePage() {
  useLoaderData<typeof loader>();

  return (
    <Page title="Dashboard">
      <p>Hello, world!</p>
    </Page>
  );
}
