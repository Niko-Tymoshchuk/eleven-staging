import type { Shop } from "@prisma/client";
import type { AdminApiContext } from "@shopify/shopify-app-remix/server";
import resultsData from "~/assets/results.json";

const requestShopData = `
  #graphql
  query {
    shop {
      id
      name
      myshopifyDomain
      contactEmail
    }
  }
`;

const requestMetafields = `
  #graphql
  mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
        createdAt
        updatedAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export const createShop = async (admin: AdminApiContext) => {
  const response = await admin.graphql(requestShopData);
  const result = await response.json();

  if (!result?.data?.shop) {
    throw new Error("Shop data not found");
  }

  const {
    contactEmail,
    id,
    myshopifyDomain,
    name,
  }: Omit<Shop, "myShopifyDomain"> & { myshopifyDomain: string } =
    result?.data?.shop;

  await prisma.shop.upsert({
    where: {
      id,
    },
    update: {
      contactEmail: contactEmail,
      name: name,
      myShopifyDomain: myshopifyDomain,
    },
    create: {
      contactEmail: contactEmail,
      name: name,
      myShopifyDomain: myshopifyDomain,
      id,
    },
  });

  return id;
};

export const getShop = async (shopifyShopId: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      id: shopifyShopId,
    },
  });
  return result;
};

export const initializeMetafields = async (
  admin: AdminApiContext,
  shopId: string,
) => {
  console.log("typeof resultsData :>> ", typeof resultsData);

  const result = await admin.graphql(requestMetafields, {
    variables: {
      metafields: [
        {
          value: JSON.stringify(resultsData),
          namespace: "eleven_app",
          key: "result_text",
          type: "json",
          ownerId: shopId,
        },
      ],
    },
  });

  console.log(result);

  return result;
};
