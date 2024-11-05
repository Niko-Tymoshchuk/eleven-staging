import type { Subscriber } from "@prisma/client";

export type SubscriberDataType = Omit<
  Subscriber,
  "id" | "createdAt" | "updatedAt"
>;

export type ActionValidationErrors = Partial<
  {
    [K in keyof Subscriber]: string;
  } & {
    email: string;
    name: string;
    lifePathNumber: string;
    expressionNumber: string;
    soulNumber: string;
    personalNumber: string;
    other: string;
  }
>;

export type WEBHOOK_TOPICS = "APP_UNINSTALLED";
