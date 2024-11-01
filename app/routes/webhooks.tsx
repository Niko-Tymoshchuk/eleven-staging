import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
// import db from "../db.server";
import type { AdminApiContext } from "@shopify/shopify-app-remix/server";
import type { WEBHOOK_TOPICS } from "~/types/commonTypes";
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
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic as WEBHOOK_TOPICS) {
    case "APP_UNINSTALLED":
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
      break;
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  // if (session) {
  //   await db.session.deleteMany({ where: { shop } });
  // }

  return new Response();
};
