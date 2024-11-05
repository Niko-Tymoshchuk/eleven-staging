import prisma from "~/db.server";

type UninstallProps = {
  shop: string;
  shopifyShopId: string;
};

export async function clearDbAfterUninstall({
  shop,
  shopifyShopId,
}: UninstallProps): Promise<void> {
  await prisma.session.deleteMany({ where: { shop } });
  await prisma.shop.delete({
    where: {
      id: shopifyShopId,
    },
  });
}
