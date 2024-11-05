import type { SubscribeType } from "~/types/commonTypes";

const OMNISEND_API_KEY = process.env.OMNISEND_API_KEY || "";

export const subscribe = async ({
  subscriber,
  collectionDescription,
  collectionImage,
  personalDescription,
}: SubscribeType) => {
  const body = {
    fields: {
      personalNumber: subscriber?.personalNumber,
      collectionId: subscriber?.personalNumber,
      collectionDescription,
      customerName: subscriber?.name,
      collectionImage,
      personalDescription,
    },
    name: "Custom Subscription",
    systemName: "custom_subscription",
    email: subscriber?.email,
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": OMNISEND_API_KEY,
    },
    body: JSON.stringify(body),
  };

  await fetch("https://api.omnisend.com/v3/events", options);
};
