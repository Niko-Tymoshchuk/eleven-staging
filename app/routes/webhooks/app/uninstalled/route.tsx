import type { ActionFunctionArgs } from "@remix-run/node";
import type { AdminApiContext } from "@shopify/shopify-app-remix/server";
import { authenticate } from "~/shopify.server";
import { clearDbAfterUninstall } from "~/utils/clearDbAfterUninstall";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    shop,
    session,
    topic,
    payload,
    admin: legacyAdmin,
  } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  const admin = legacyAdmin as unknown as AdminApiContext;
  if (!admin) {
    throw new Response();
  }

  if (session) {
    try {
      const shopifyShopId = (payload as { id: number }).id.toString();

      await clearDbAfterUninstall({
        shop: shop,
        shopifyShopId,
      });
    } catch (e) {
      throw new Error(`error updating shop: ${e}`);
    }
  }

  return new Response();
};
